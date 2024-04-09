const fs = require('fs');

// Функція для читання графу з файлу
function readGraphFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const lines = fileContent.trim().split('\n');
    const graph = {};
    lines.forEach(line => {
        const [node, edgeString] = line.split(' -> ');
        const edges = edgeString ? edgeString.split(', ') : [];
        graph[node.trim()] = edges.map(edge => edge.trim());
    });
    return graph;
}

// Функція для визначення мінімальної кількості кольорів для розфарбування графу
function colorGraph(graph) {
    const colorsAssigned = {};
    for (const node in graph) {
        let color = 1;
        while (!isColorValid(graph, colorsAssigned, node, color)) {
            color++;
        }
        colorsAssigned[node] = color;
    }
    return colorsAssigned;
}

// Функція для перевірки, чи може бути призначено певний колір вершині
function isColorValid(graph, colorsAssigned, node, color) {
    for (const neighbor of graph[node]) {
        if (colorsAssigned[neighbor] === color) {
            return false;
        }
    }
    return true;
}

// Головна функція
function main() {
    const filePath = 'graph.txt'; 
    const graph = readGraphFromFile(filePath);
    const coloring = colorGraph(graph);
    console.log("Розфарбування графу:");
    Object.keys(coloring).forEach(node => {
        console.log(`Вершина ${node}: Колір ${coloring[node]}`);
    });
}

main();
