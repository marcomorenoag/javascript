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
}

module.exports = { BinarySearchTree };

// UNIT TESTING
const bst = new BinarySearchTree();
bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
/*
            4
    2               6
1       3       5       7
*/

bst.remove(4);
/*
            5
    2               6
1       3               7
*/
console.log(bst.findMin());
console.log(bst.findMax());

bst.remove(7);
/*
            5
    2               6
1       3            
*/
console.log(bst.findMax());
console.log(bst.isPresent(4));
