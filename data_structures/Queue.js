class Queue {
    constructor() {
        this.collection = [];
    }

    print() {
        console.log(this.collection);
    }

    enqueue(element) {
        this.collection.push(element);
    }

    dequeue() {
        return this.collection.shift();
    }

    front() {
        return this.collection[0];
    }

    size() {
        return this.collection.length;
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

class PriorityQueue extends Queue {
    /**
     * Enqueue new element to Queue based on its priority (1 => highest priority)
     * @param {Array [element, priority]} element 
     */
    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
            return;
        }
        let added = false;
        for (let idx = 0; idx < this.size(); idx++) {
            if (element[1] < this.collection[idx][1]) {
                this.collection.splice(idx, 0, element);
                added = true;
                break;
            }
        }
        if (!added) this.collection.push(element);
    }

    dequeue() {
        const [value, _] = this.collection.shift();
        return value;
    }
}

module.exports = { Queue, PriorityQueue };

// UNIT TESTING
// Queue
const q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.enqueue('c');
q.print();
q.dequeue();
console.log(q.front());
q.print();

// Priority Queue
const pq = new PriorityQueue();
pq.enqueue(['Beau Carnes', 2])
pq.enqueue(['Quincy Larson', 3])
pq.enqueue(['Ewa Mitulska-Wójcik', 1])
pq.enqueue(['Briana Swift', 2])
pq.print();
pq.dequeue();
pq.front();
pq.print();
