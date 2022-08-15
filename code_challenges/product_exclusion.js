// Given an array of integers, return an array of integers such that the values
// at index i of the output is the product of everything in the input except
// the input value at the index i. An empty list should return [].
// A list of length 1 should return [1] no matter what te input element is.

// Example:
// product_exclusion([2, 3, 4, 5]) => [60, 40, 30, 24]

// input = [0, 3, 4, 5]
// output = [60, 0, 0, 0]

// input = [0, 0, 3, 4]
// output = [0, 0, 0, 0]

const product_exclusion = (numbers) => {
  if (numbers.length === 0) return [];
  if (numbers.length === 1) return [1];

  const sol = numbers.map((_, idx, innerNumber) => {
    return innerNumber
      .filter((_, innerIdx) => innerIdx !== idx)
      .reduce((acc, cur) => acc * cur, 1);
  });
  return sol;
};

console.log(product_exclusion([100]));
console.log(product_exclusion([2, 3, 4, 5]));
console.log(product_exclusion([0, 3, 4, 5]));
console.log(product_exclusion([0, 0, 3, 4]));
