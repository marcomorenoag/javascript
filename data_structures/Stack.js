function Stack () {
    this.count = 0;
    this.storage = {};

    this.push = (value) => {
        this.storage[this.count] = value;
        this.count++;
    }
    
    this.pop = () => {
        if (this.count == 0) return undefined;
        this.count--;
        const result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }
    
    this.size = () => {
        return this.count;
    }

    this.peek = () => {
        return this.storage[this.count - 1];
    }
}

module.exports = { Stack };

// UNIT TESTING
const myStack = new Stack();
myStack.push(1);
myStack.push(2);
console.log("Peek 1:\t", myStack.peek());
console.log("Pop 1:\t", myStack.pop());
console.log("Peek 2:\t", myStack.peek());
myStack.push("freeCodeCamp");
console.log("Size 1:\t", myStack.size())
console.log("Peek 3:\t", myStack.peek())
console.log("Pop 2:\t", myStack.pop())
console.log("Peek 4:\t", myStack.peek())
