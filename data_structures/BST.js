class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor(root = null) {
        this.root = root;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        const searchTree = (node) => {
            if (data < node.data) {
                if (node.left) {
                    return searchTree(node.left);
                }
                node.left = newNode;
                return;
            } else if (data > node.data) {
                if (node.right) {
                    return searchTree(node.right);
                }
                node.right = newNode;
                return;
            } else {
                return;
            }
        }
        return searchTree(this.root);
    }

    findMin() {
        let currentNode = this.root;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.data;
    }

    findMax() {
        let currentNode = this.root;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }

    find(data) {
        const searchTree = (node) => {
            if (!node) return null;
            if (node.data === data) return node;
            if (node.data < data) return searchTree(node.left);
            if (node.data > data) return searchTree(node.right);
        }
        return searchTree(this.root);
    }

    isPresent(data) {
        return !!this.find(data);
    }

    remove(data) {
        const removeNode = (node, data) => {
            if (node === null) return null;
            if (data === node.data) {
                // Case 1: leaf node (no children)
                if (node.left === null && node.right === null) return null;

                // Case 2: node has no left child
                if (node.left === null) return node.right;

                // Case 3: node has no right child
                if (node.right === null) return node.left;

                // Case 4: node has two children
                let auxNode = node.right;
                while (auxNode.left !== null) {
                    auxNode = auxNode.left;
                }
                node.data = auxNode.data;
                node.right = removeNode(node.right, data);
                
                return node;
            }
            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            node.right = removeNode(node.right, data);
            return node;
        }
        this.root = removeNode(this.root, data);
    }

    findMinHeight(targetNode = this.root) {
        // Check first node without two children and returns its height (# of edges to the root)
        const helper = (node, height = -1) => {
            const currentHeight = height + 1;
            if (node === null) return null;
            if (node.left === null || node.right === null) return currentHeight;
            return Math.min(helper(node.left, currentHeight), helper(node.right, currentHeight));
        }
        return helper(targetNode);
    }

    findMaxHeight(targetNode = this.root) {
        const helper = (node, height = -1) => {
            const currentHeight = height + 1;
            if (node === null) return null;
            if (node.left === null && node.right === null) return currentHeight;
            return Math.max(helper(node.left, currentHeight), helper(node.right, currentHeight));
        }
        return helper(targetNode);
    }

    isBalanced() {
        const difference = this.findMaxHeight() - this.findMinHeight();
        return difference <= 1;
    }

    /**
     * TRAVERSAL METHODS
     */

    // DEEP FIRST SEARCH (DFS)
    // These three traversals might be solve using a LIFO (Stack) structure
    
    //  Left - Root - Right
    inOrder() {
        if (this.root === null) return null;
        let items = [];
        const traverseInOrder = (node) => {
            node.left && traverseInOrder(node.left);
            items.push(node.data);
            node.right && traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return items;
    }
    
    // Root - Left - Right
    preOrder() {
        if (this.root === null) return null;
        let items = [];
        const traversePreOrder = (node) => {
            items.push(node.data);
            node.left && traversePreOrder(node.left);
            node.right && traversePreOrder(node.right);
        }
        traversePreOrder(this.root);
        return items;
    }
    
    // Left - Right - Root
    postOrder() {
        if (this.root === null) return null;
        let items = [];
        const traversePostOrder = (node) => {
            node.left && traversePostOrder(node.left);
            node.right && traversePostOrder(node.right);
            items.push(node.data);
        }
        traversePostOrder(this.root);
        return items;
    }

    // BREADTH FIRST SEARCH (BFS)
    // This traversal might be solve using a FIFO (Queue) structure
    levelOrder() {
        if (this.root === null) return null;
        let items = [];
        let queue = [this.root];
        while (queue.length > 0) {
            let currentNode = queue.shift();
            items.push(currentNode.data);
            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);
        }
        return items;
    }
}

// UNIT TESTING
function main() {
    const bst = new BinarySearchTree();
    bst.add(9);
    bst.add(4);
    bst.add(17);
    bst.add(3);
    bst.add(6);
    bst.add(22);
    bst.add(5);
    bst.add(7);
    bst.add(20);
    /*
                9
        4               17
    3       6               22
        5     7           20
    */
    console.log(bst.findMinHeight());
    console.log(bst.findMaxHeight());
    console.log(bst.isBalanced());

    bst.add(10);
    /*
                9
        4               17
    3       6        10     22
        5     7           20
    */
    console.log(bst.findMinHeight());
    console.log(bst.findMaxHeight());
    console.log(bst.isBalanced());

    console.log(`inOrder: ${bst.inOrder()}`);
    console.log(`preOrder: ${bst.preOrder()}`);
    console.log(`postOrder: ${bst.postOrder()}`);
    console.log(`levelOrder: ${bst.levelOrder()}`);
}

if (typeof require !== null && require.main === module) {
    main();
}

module.exports = { BinarySearchTree };