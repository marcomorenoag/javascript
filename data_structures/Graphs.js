/* GRAPHS: BREADTH-FIRST SEARCH */

function bfs(graph, root) {
    let nodeDistancesFromRoot = {};

    for (let i = 0; i < graph.length; i++) {
        nodeDistancesFromRoot[i] = Infinity; // Infinity means that is not reachable (at least at start)
    }
    nodeDistancesFromRoot[root] = 0;

    let queue = [root];
    let currentNode;

    while (queue.length !== 0) {
        currentNode = queue.shift();

        let currentNodeConnections = graph[currentNode]; // Get subarray (which contains the current node´s connections/edges)
        let neighborIdx = [];
        let idx = currentNodeConnections.indexOf(1); // Look for first connection
        while (idx !== -1) {
            neighborIdx.push(idx); // Save found neighbor (connected node)
            idx = currentNodeConnections.indexOf(1, idx + 1); // Look for next connection
        }

        for (let j = 0; j < neighborIdx.length; j++) {
            if (nodeDistancesFromRoot[neighborIdx[j]] !== Infinity) continue;
            // Add distance as current node´s distance + 1 for current neighbor
            nodeDistancesFromRoot[neighborIdx[j]] = nodeDistancesFromRoot[currentNode] + 1;
            // Add current neighbor to queue to analyze its connections
            queue.push(neighborIdx[j]);
        }
    }

    return nodeDistancesFromRoot;
}

function main() {
    const bfsGraphAdjancencyMatrix = [
        [0, 1, 1, 1, 0], // Node 0
        [0, 0, 1, 0, 0], // Node 1
        [1, 1, 0, 0, 0], // Node 2
        [0, 0, 0, 1, 0], // Node 3
        [0, 1, 0, 0, 0], // Node 4
    ];
    console.log(bfs(bfsGraphAdjancencyMatrix, 1));
}

if (typeof require !== undefined && require.main === module) {
    main();
}

module.exports = { bfs };
