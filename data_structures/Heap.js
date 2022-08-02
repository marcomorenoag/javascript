/* Heaps */
// A binary heap is a partially ordered binary tree which satisfies the heap property.
// left child: i * 2
// right child: i * 2 + 1
// parent: i / 2

/**
 * This Heap towards from smaller (root) to higher numbers (leaf nodes)
 */
let MinHeap = function() {
    let heap = [null];

    this.insert = function(num) {
        heap.push(num);
        if (heap.length <= 2) return;

        let idx = heap.length - 1;
        while (heap[idx] < heap[Math.floor(idx / 2)]) {
            if (idx < 1) return; // Root node reached
            [heap[Math.floor(idx / 2)], heap[idx]] = [heap[idx], heap[Math.floor(idx / 2)]];
            if (Math.floor(idx / 2) <= 1) break; // Current node´s parent is root
            idx = Math.floor(idx / 2);
        }
    }

    this.remove = function() {
        if (heap.length < 2) return null;
        
        let smallest = heap[1];
        if (heap.length === 2) {
            heap.splice(1, 1);
            return smallest;
        }
        
        heap[1] = heap[heap.length - 1]; // Assign last item as new Heap´s root
        heap.splice(heap.length - 1); // Delete last item

        // Easy case: only there are two nodes into the heap
        if (heap.length === 3) {
            if (heap[1] > heap[2]) {
                [heap[1], heap[2]] = [heap[2], heap[1]];
            }
            return smallest;
        }

        let i = 1;
        let left = 2 * i;
        let right = 2 * i + 1;
        while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
            // Looking for smallest node of children (comparison between siblings) and exchange it with theirs parent
            if (heap[left] < heap[right]) {
                [heap[i], heap[left]] = [heap[left], heap[i]];
                i = 2 * i;
            } else {
                [heap[i], heap[right]] = [heap[right], heap[i]];
                i = 2 * i + 1;
            }
            left = 2 * i;
            right = 2 * i + 1;
            if (heap[left] === undefined || heap[right] === undefined) break;
        }
        return smallest;
    }

    this.sort = function() {
        let result = new Array();
        while (heap.length > 1) {
            result.push(this.remove());
        }
        return result;
    }
}

// let MaxHeap = function() {}


function main() {
    let myMinHeap = new MinHeap();
    myMinHeap.insert(15);
    myMinHeap.insert(8);
    myMinHeap.insert(14);
    myMinHeap.insert(20);
    myMinHeap.insert(28);
    myMinHeap.insert(1);
    myMinHeap.remove();
    console.log(myMinHeap.sort());
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { MinHeap };
