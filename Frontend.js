function isPermutation(str1, str2) {
    var check_string = true; 
    if (str1.length > str2.length) {
        check_string = false;
        return check_string;
    }
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);
    const aCharCode = 'a'.charCodeAt(0);
    for (let i = 0; i < str1.length; i++) {
        s1Count[str1.charCodeAt(i) - aCharCode]++;
        s2Count[str2.charCodeAt(i) - aCharCode]++;
    }
    function arraysMatch(arr1, arr2) {
        for (let i = 0; i < 26; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    if (arraysMatch(s1Count, s2Count)) {
        return check_string; 
    }
    for (let i = str1.length; i < str2.length; i++) {
        s2Count[str2.charCodeAt(i) - aCharCode]++;

        s2Count[str2.charCodeAt(i - str1.length) - aCharCode]--;
        if (arraysMatch(s1Count, s2Count)) {
            return check_string;
        }
    }
    check_string = false;
    return check_string;
}

console.log("check_string =", isPermutation("qwa", "wqawsdfgt")); 
console.log("check_string =", isPermutation("qwd", "wdfijewjewewswf")); 
function runways_required(arrival_time, departure_time, no_of_planes) {
    var no_of_runways = 1;
    for (let i = 0; i < no_of_planes; i++) {
        if (departure_time[i] < arrival_time[i]) {
            departure_time[i] += 2400;
        }
    }

    arrival_time.sort((a, b) => a - b);
    departure_time.sort((a, b) => a - b);

    let arrival_index = 0;
    let departure_index = 0;
    let current_runways = 0;

    while (arrival_index < no_of_planes && departure_index < no_of_planes) {
        if (arrival_time[arrival_index] < departure_time[departure_index]) {
            current_runways++; 
            arrival_index++;
            no_of_runways = Math.max(no_of_runways, current_runways);
        } else {
            current_runways--;
            departure_index++;
        }
    }

    return no_of_runways;
}
function major_element(arr, n) {
    var maximum_times = 0;

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] === arr[j]) {
                count++;
            }
        }
        if (count > n / 2) {
            maximum_times = arr[i];
            return maximum_times;
        }
    }
    maximum_times = -1;
    return maximum_times;
}

let arr = [1, 1, 2, 1, 3, 5, 1];
console.log(major_element(arr, arr.length)); // Output: 1
function minimum_pages(arr, n, k) {
    let allocated_value = -1;
    if (n < k) return allocated_value;
    function canAllocate(arr, n, k, maxPages) {
        let studentsRequired = 1;
        let currentPages = 0;

        for (let i = 0; i < n; i++) {
            if (arr[i] > maxPages) return false;

            if (currentPages + arr[i] > maxPages) {
                studentsRequired++;
                currentPages = arr[i];
                if (studentsRequired > k) return false;
            } else {
                currentPages += arr[i];
            }
        }
        return true;
    }

    // Initialize binary search bounds
    let low = Math.max(...arr); 
    let high = arr.reduce((sum, pages) => sum + pages, 0); // Sum of all pages

    // Binary search for the optimal solution
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (canAllocate(arr, n, k, mid)) {
            allocated_value = mid; 
            high = mid - 1; 
        } else {
            low = mid + 1; 
        }
    }

    return allocated_value;
}

// Example usage
const n = 8;
const arr = [11, 33, 15, 62, 22, 15, 31, 60];
const k = 3;
console.log(minimum_pages(arr, n, k)); // Output: 99
