const hash = (string, max) => {
    let hash = 0;
    for (let idx = 0; idx < string.length; idx++) {
        hash += string.charCodeAt(idx);
    }
    return hash % max;
}

const HashTable = function() {
    this.storage = [];
    this.storageLimit = 4;

    this.add = (key, value) => {
        let index = hash(key, this.storageLimit);

        if (this.storage[index] === undefined) {
            this.storage[index] = [[key, value]];
            return;
        }
        let inserted = false;
        for (let idx = 0; idx < this.storage[index].length; idx++) {
            if (this.storage[index][idx][0] === key) {
                this.storage[index][idx][1] = value;
                inserted = true;
            }
        }
        if (inserted === false) {
            this.storage[index].push([key, value]);
        }
    }

    this.remove = (key) => {
        let index = hash(key, this.storageLimit);
        if (this.storage[index].length === 1 && this.storage[index][0][0] === key) {
            delete this.storage[index];
            return;
        }
        for (let idx = 0; idx < this.storage[index]; idx++) {
            if (this.storage[index][idx][0] === key) {
                delete this.storage[index][idx];
            }
        }
    }

    this.lookup = (key) => {
        let index = hash(key, this.storageLimit);
        if (this.storage[index] === undefined) return undefined;
        for (let idx = 0; idx < this.storage[index].length; idx++) {
            if (this.storage[index][idx][0] === key) {
                return this.storage[index][idx][1];
            }
        }
    }

    // Not part of definition, used here only for learning purposes
    this.print = () => {
        console.log(this.storage);
    }
}

// UNIT TESTING
function main() {
    console.log(hash('quincy', 10));

    const ht = new HashTable();
    ht.add('beau', 'person');
    ht.add('fido', 'dog');
    ht.add('rex', 'dinosour');
    ht.add('tux', 'penguin');
    console.log(ht.lookup('tux'));
    ht.print()
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { HashTable, hash };