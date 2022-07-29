function myMap() {
    this.collection = {};
    this.count = 0;

    this.size = () => {
        return this.count;
    }

    this.set = (key, value) => {
        if (key in this.collection) return null;
        this.collection[key] = value;
        this.count++;
    }

    this.has = (key) => {
        return (key in this.collection);
    }

    this.get = (key) => {
        if (!(key in this.collection)) return null;
        return this.collection[key];
    }

    this.delete = (key) => {
        if (!(key in this.collection)) return null;
        delete this.collection[key];
        this.count--;
    }

    this.values = () => {
        const items = Object.keys(this.collection).map((key) => this.collection[key]);
        return (items.length > 0) ? items : null;
    }

    this.clear = () => {
        this.collection = {};
        this.count = 0;
    }
}

// UNIT TESTING
function main () {
    const map = new myMap();
    map.set('arms', 2);
    map.set('fingers', 10);
    map.set('eyes', 2);
    map.set('belley button', 1);

    console.log(map.get('fingers'));
    console.log(map.size());
    console.log(map.values());

    const map2 = new Map();
    map2.has('hands');
    map2.entries();

    let keyObj = {}, keyFunc = function() {};
    map2.set('hello', 'string value');
    map2.set(keyObj, 'obj value');
    map2.set(keyFunc, 'func value');
    map2.set(NaN, 'NaN value');

    console.log(map2.size);

    console.log(map2.get('hello'));
    console.log(map2.get(keyObj));
    console.log(map2.get(keyFunc));
    console.log(map2.get(NaN));
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { myMap };