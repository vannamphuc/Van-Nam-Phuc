// Problem 1: Three ways to sum to n

var sum_to_n_a = function (n) {
  // Method A: O(1) - Mathematical formula
  // Advantage: very efficient, constant time complexity
  // Disadvantage: requires knowledge of the formula
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // Method B: O(n) - Iterative approach with a loop
  // Advantage: straightforward and easy to understand
  // Disadvantage: less efficient for large n compared to Method A
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  // Method C: O(n) - Using Array methods
  // Advantage: concise and leverages built-in functions
  // Disadvantage: less efficient due to array creation
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
};

var sum_to_n_d = function (n) {
  // Method D: O(n) - Recursive approach
  // Advantage: elegant and demonstrates recursion
  // Disadvantage: can lead to stack overflow for large n
  if (n <= 1) return n;
  return n + sum_to_n_d(n - 1);
};
