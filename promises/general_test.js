const log = (msg) => console.log(msg);

Promise.resolve().then(() => log(1));
setTimeout(() => log(2));
Promise.resolve().then(() => log(3));
log(4);

/* Hypothesis
4
1
3
2
*/


/**
 * TS
 * type A = Record<number, string>
 * 
 * React
 * useEffectLayout
 * Prevents flickering effects, 
 */