/**
 * Implementation of merge sort with asymptotic notation or time complexity of O(n*log(n))
 * That complexity is due O(n) for "merge" function and O(log(n)) for "mergeSort" 
 */
const merge = (leftArr, rightArr) => {
    let resultArr = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while(leftIdx < leftArr.length && rightIdx < rightArr.length) {
        if (leftArr[leftIdx] < rightArr[rightIdx]) {
            resultArr.push(leftArr[leftIdx]);
            leftIdx++;
        } else {
            resultArr.push(rightArr[rightIdx]);
            rightIdx++;
        }
    }

    // Concatenate the trailing elements of the left and right arrays together
    return resultArr.concat(leftArr.slice(leftIdx)).concat(rightArr.slice(rightIdx));
}

const mergeSort = (arr) => {
    if (arr.length < 2) return arr;

    const midIdx = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, midIdx);
    const rightArr = arr.slice(midIdx, arr.lenght);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

const testArray = [12, 3, 16, 6, 5, 1];
console.log(mergeSort(testArray));