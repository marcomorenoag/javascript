class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    size() {
        return this.length;
    }

    head() {
        return this.head;
    }

    add(element) {
        const newNode = new Node(element);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while(currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
        this.length++;
    }

    remove(element) {
        if (this.head === null) return;
        let currentNode = this.head;
        let previousNode;
        if (currentNode.element === element) {
            this.head = currentNode.next;
        } else {
            while(currentNode.element !== element) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        this.length--;
    }

    isEmpty() {
        return this.length === 0;
    }

    indexOf(element) {
        let foundIndex = -1;
        if (this.head === null) return foundIndex;
        let currentNode = this.head;
        
        while(currentNode) {
            foundIndex++;
            if (currentNode.element === element) return foundIndex;
            currentNode = currentNode.next;
        }
        return -1;
    }

    elementAt(index) {
        if (this.head === null) return;
        let currentNode = this.head;
        let count = 0;
        while (count < index) {
            count++;
            currentNode = currentNode.next;
        }
        return currentNode.element;
    }

    addAt(index, element) {
        const newNode = new Node(element);
        let currentNode = this.head;
        let previousNode;
        let count = 0;

        if (index > this.length) return false;

        if (index === 0) {
            newNode.next = currentNode;
            this.head = newNode;
        } else {
            while (count < index) {
                count++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = newNode;
            newNode.next = currentNode;
        }
        this.length++;
    }

    removeAt(index) {
        let currentNode = this.head;
        let previousNode;
        let count = 0;

        if (index < 0 || index >= this.length) return false;

        if (index === 0) {
            this.head = currentNode.next;
        } else {
            while (count < index) {
                count++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        this.length--;
        return currentNode.element;
    }
}

// UNIT TESTING
function main() {
    const conga = new LinkedList();
    conga.add('Kitten');
    conga.add('Puppy');
    conga.add('Dog');
    conga.add('Cat');
    conga.add('Fish');
    console.log(conga.size());
    console.log(conga.removeAt(3));
    console.log(conga.elementAt(3));
    console.log(conga.indexOf('Puppy'));
    console.log(conga.size());
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { LinkedList };