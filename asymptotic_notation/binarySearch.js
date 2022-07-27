const binarySearch = (array, start, end, target) => {
    const midpoint = Math.floor((start + end) / 2);
    if (start > end) return false;
    if (array[midpoint] === target) return true;
    if (array[midpoint] < target) {
        return binarySearch(array, midpoint + 1, end, target)
    }
    if (array[midpoint] > target) {
        return binarySearch(array, start, midpoint - 1, target)
    }
}

const arr = [1,2,3,4,5,6,7,8]
let start = 0
let end = arr.length - 1
let targetValue = 8

console.log(binarySearch(arr, start, end, targetValue))