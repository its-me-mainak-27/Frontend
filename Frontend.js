function isPermutation(str1, str2) {
    var check_string = true; // Initially set to true as required

    // If str1 is longer than str2, then it's impossible for str1's permutation to be in str2
    if (str1.length > str2.length) {
        check_string = false;
        return check_string;
    }

    // Initialize frequency arrays for characters 'a' to 'z'
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);
    const aCharCode = 'a'.charCodeAt(0);

    // Count character frequencies in str1 and the first window of str2
    for (let i = 0; i < str1.length; i++) {
        s1Count[str1.charCodeAt(i) - aCharCode]++;
        s2Count[str2.charCodeAt(i) - aCharCode]++;
    }

    // Function to compare two frequency arrays
    function arraysMatch(arr1, arr2) {
        for (let i = 0; i < 26; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    // Check if the initial window matches
    if (arraysMatch(s1Count, s2Count)) {
        return check_string; // Return true if a permutation is found in the first window
    }

    // Slide the window across str2
    for (let i = str1.length; i < str2.length; i++) {
        // Include the next character in the window
        s2Count[str2.charCodeAt(i) - aCharCode]++;
        // Remove the first character of the previous window
        s2Count[str2.charCodeAt(i - str1.length) - aCharCode]--;
        
        // Check if the updated window matches
        if (arraysMatch(s1Count, s2Count)) {
            return check_string; // Return true if a permutation is found
        }
    }

    // If no permutation was found, update check_string to false
    check_string = false;
    return check_string;
}

// Example usage:
console.log("check_string =", isPermutation("qwa", "wqawsdfgt")); // Output: check_string = true
console.log("check_string =", isPermutation("qwd", "wdfijewjewewswf")); // Output: check_string = false
function runways_required(arrival_time, departure_time, no_of_planes) {
    var no_of_runways = 1; // Initially set to 1

    // Convert departure times that are less than arrival times to the next day
    for (let i = 0; i < no_of_planes; i++) {
        if (departure_time[i] < arrival_time[i]) {
            departure_time[i] += 2400; // Add 24 hours to account for next day
        }
    }

    // Sort both arrival and departure times
    arrival_time.sort((a, b) => a - b);
    departure_time.sort((a, b) => a - b);

    let arrival_index = 0;
    let departure_index = 0;
    let current_runways = 0;

    // Traverse both arrays using two pointers
    while (arrival_index < no_of_planes && departure_index < no_of_planes) {
        // If a plane arrives before another plane departs
        if (arrival_time[arrival_index] < departure_time[departure_index]) {
            current_runways++; // Need a new runway
            arrival_index++;
            
            // Update the maximum runways needed
            no_of_runways = Math.max(no_of_runways, current_runways);
        } else {
            // A plane departs, free up a runway
            current_runways--;
            departure_index++;
        }
    }

    return no_of_runways;
}
function major_element(arr, n) {
    var maximum_times = 0;

    // Loop to consider each element as a candidate for majority
    for (let i = 0; i < n; i++) {
        let count = 0;

        // Inner loop to count the frequency of arr[i]
        for (let j = 0; j < n; j++) {
            if (arr[i] === arr[j]) {
                count++;
            }
        }

        // Check if count of arr[i] is more than half the size of the array
        if (count > n / 2) {
            maximum_times = arr[i];
            return maximum_times;
        }
    }

    // If no majority element found, return -1
    maximum_times = -1;
    return maximum_times;
}

// Example usage
let arr = [1, 1, 2, 1, 3, 5, 1];
console.log(major_element(arr, arr.length)); // Output: 1
function minimum_pages(arr, n, k) {
    let allocated_value = -1;

    // If there are fewer books than students, allocation is not possible
    if (n < k) return allocated_value;

    // Helper function to check if we can allocate books with a max page limit
    function canAllocate(arr, n, k, maxPages) {
        let studentsRequired = 1;
        let currentPages = 0;

        for (let i = 0; i < n; i++) {
            // If a single book has more pages than maxPages, allocation is not possible
            if (arr[i] > maxPages) return false;

            // Accumulate pages for the current student
            if (currentPages + arr[i] > maxPages) {
                // Allocate to a new student if adding this book exceeds maxPages
                studentsRequired++;
                currentPages = arr[i];

                // If we need more students than available, return false
                if (studentsRequired > k) return false;
            } else {
                currentPages += arr[i];
            }
        }
        return true;
    }

    // Initialize binary search bounds
    let low = Math.max(...arr); // Minimum possible max allocation (largest single book)
    let high = arr.reduce((sum, pages) => sum + pages, 0); // Sum of all pages

    // Binary search for the optimal solution
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        // Check if we can allocate books with maxPages = mid
        if (canAllocate(arr, n, k, mid)) {
            allocated_value = mid; // Update allocated_value with a smaller possible value
            high = mid - 1; // Try for a better solution on the left side
        } else {
            low = mid + 1; // Increase the lower bound if mid is too small
        }
    }

    return allocated_value;
}

// Example usage
const n = 8;
const arr = [11, 33, 15, 62, 22, 15, 31, 60];
const k = 3;
console.log(minimum_pages(arr, n, k)); // Output: 99