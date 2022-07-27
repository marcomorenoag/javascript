const isIntegerPalindrome = (number) => {
    // Validate that actually there is a number (possitive or negative) to analyze
    if (!number) return false;
    // PHASE 1: Get last digit and save it in a new array
    // PHASE 2: Divide the number by 10 and truncate to int (Math.floor)
    // PHASE 3: Iterate over above steps until number would be 0
    // PHASE 4: Iterate over new generated array using indexes (similar to above solution)
    const processedNumber = processInt(number);
    return checkDigitsArray(processedNumber);
};

const processInt = (number) => {
    let digits = [];
    let processedNumber = number;

    while (processedNumber !== 0) {
        // Get last digit, this
        const lastDigit = processedNumber % 10;

        // Push at first position to keep same order
        digits.unshift(lastDigit);

        // If lastDigit is negative, that means that is a negative number to analyze
        // Then we save that -1 which only means the negative operator
        if (lastDigit < 0) {
            processedNumber *= -1; // Make it possitive for next iterations
            continue;
        }

        // Remove lastDigit making a division
        processedNumber = Math.floor(processedNumber / 10);
    }

    return digits;
};

const checkDigitsArray = (digits) => {
    if (!digits.length) return false;

    let leftIdx = 0;
    let rightIdx = digits.length - 1;
    let isPalindrome = true;

    while (leftIdx < rightIdx) {
        if (digits[leftIdx] !== digits[rightIdx]) {
            isPalindrome = false;
            break;
        }

        leftIdx++;
        rightIdx--;
    }

    return isPalindrome;
};

// UNIT TESTS
console.log(isIntegerPalindrome(121)); // It should return true
console.log(isIntegerPalindrome(-121)); // It should return false
console.log(isIntegerPalindrome(123)); // It should return false
console.log(isIntegerPalindrome(10)); // It should return false
console.log(isIntegerPalindrome(2 ** 31 - 1)); // It should return false
console.log(isIntegerPalindrome(-(2 ** 31))); // It should return false
console.log(isIntegerPalindrome(10001)); // It should return true
console.log(isIntegerPalindrome()); // It should return false
