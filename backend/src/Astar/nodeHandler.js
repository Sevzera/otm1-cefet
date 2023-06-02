/*
	Exemplo com node_name:
	  {
      [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ]
    }
*/

const createNode = (x, y, node_name, heuristic, real_distance, food) => {
	return {
		node_name: node_name,
		h_distance: heuristic,
		real_distance: real_distance,
		positionInMatrix: {x: x, y: y},
		food: false,
		neighbors: [],
		visited: false,
        parent: null,

		setNeighbors: function (line, column, nodes) {
			if (line > 0) {
				this.neighbors.push({
					node: nodes[line - 1][column],
					g_distance: 1
				});
			}
			if (line < nodes[0].length - 1) {
				this.neighbors.push({
					node: nodes[line + 1][column],
					g_distance: 1
				});
			}
			if (column > 0) {
				this.neighbors.push({
					node: nodes[line][column - 1],
					g_distance: 1
				});
			}
			if (column < nodes[0].length - 1) {
				this.neighbors.push({
					node: nodes[line][column + 1],
					g_distance: 1
				});
			}
		},
	};
};

export const generateNodes = (
	lines,
	columns,
	heuristic_data,
	data,
) => {
	let nodes = [];
	let node_name = 0;
	for (let i = 0; i < lines; i++) {
		nodes.push([]);
		for (let j = 0; j < columns; j++) {
			nodes[i].push(createNode(i, j, node_name, heuristic_data[i][j], 1, data[i][j].food));
			node_name++;
		}
	}

	for (let i = 0; i < lines; i++) {
		for (let j = 0; j < columns; j++) {
			nodes[i][j].setNeighbors(i, j, nodes);
		}	
	}

	return nodes;
};