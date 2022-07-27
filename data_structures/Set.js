class mySet {
    constructor() {
        this.collection = [];
    }

    has(element) {
        return this.collection.indexOf(element) !== -1;
    }

    values() {
        return this.collection;
    }

    add(element) {
        if (this.has(element)) return false;
        this.collection.push(element);
        return true;
    }

    remove(element) {
        if (!this.has(element)) return false;
        const idx = this.collection.indexOf(element);
        this.collection.splice(idx, 1);
        return true;
    }

    size() {
        return this.collection.length;
    }

    union(otherSet) {
        const firstSet = this.values();
        const secondSet = otherSet.values();
        let unionSet = new mySet();

        firstSet.forEach(element => unionSet.add(element));
        secondSet.forEach(element => unionSet.add(element));
        
        return unionSet;
    }

    intersection(otherSet) {
        const firstSet = this.values();
        let intersectionSet = new mySet();

        firstSet.forEach(element => otherSet.has(element) && intersectionSet.add(element));

        return intersectionSet;
    }

    difference(otherSet) {
        const firstSet = this.values();
        let differenceSet = new mySet();

        firstSet.forEach(element => !otherSet.has(element) && differenceSet.add(element));

        return differenceSet;
    }

    subset(otherSet) {
        const firstSet = this.values();
        return firstSet.every(element => otherSet.has(element));
    }
}

module.exports = { Set };

// UNIT TESTING
const setA = new mySet();
const setB = new mySet();
setA.add('a');
setB.add('b');
setB.add('c');
setB.add('a');
setB.add('d');
console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());
console.log(setB.difference(setA).values());

const setC = new Set();
const setD = new Set();
setC.add('a');
setD.add('b');
setD.add('c');
setD.add('a');
setD.add('d');
console.log(setD.values());
setD.delete('a');
console.log(setD.has('a'));
console.log(setD.add('d'));
