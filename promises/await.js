async function square (n) {
    console.log("Inside of Promise.");
    return await (n ** 2);
}

console.log("Started...");

setTimeout(() => console.log("Inside of setTimeout API."), 0);


const result = square(2);
result.then((res) => console.log(res));

console.log("Finished.")

// RESULTS
// Starting...
// Inside of Promise.
// Finished.
// 4
// Inside of setTimeout API.