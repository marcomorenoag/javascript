const Node = function() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
        this.end = true;
    };
    this.isEnd = function() {
        return this.end;
    };
};

class Trie {
    constructor() {
        this.root = new Node();
    }

    add(input, node = this.root) {
        // There is no more letters to inspect
        if (input.length === 0) {
            node.setEnd();
            return;
        }
        // The Trie´s node has not yet the current letter (input[0])
        // So we create a new node for its directory
        if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
        // This means that the current Trie´s node already has the current letter (input[0])
        return this.add(input.substr(1), node.keys.get(input[0]));
    }

    isWord(word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) return false;
            node = node.keys.get(word[0]);
            word = word.substr(1);
        }
        // Inspecting last letter: check that last node contains that word (last letter) and that is the last one (isEnd)
        return (node.keys.has(word) && node.keys.get(word).isEnd());
    }

    print() {
        let words = new Array();
        let search = function(node, string) {
            if (node.keys.size === 0) {
                string.length > 0 ? words.push(string) : undefined;
                return;
            }
            for (let letter of node.keys.keys()) {
                search(node.keys.get(letter), string.concat(letter));
            }
            if (node.isEnd()) words.push(string);
        }
        search(this.root, new String());
        return words.length > 0 ? words : null;
    }
}

function main() {
    myTrie = new Trie();
    myTrie.add('ball');
    myTrie.add('bat');
    myTrie.add('doll');
    myTrie.add('dork');
    myTrie.add('do');
    myTrie.add('dorm');
    myTrie.add('send');
    myTrie.add('sense');
    console.log(myTrie.isWord('doll'));
    console.log(myTrie.isWord('dor'));
    console.log(myTrie.isWord('dorf'));
    console.log(myTrie.print());
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { Trie };
