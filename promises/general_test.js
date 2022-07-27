const log = (msg) => console.log(msg);

Promise.resolve().then(() => log(1));
setTimeout(() => log(2));
Promise.resolve().then(() => log(3));
log(4);

/* My thoughts
4
1
3
2
*/