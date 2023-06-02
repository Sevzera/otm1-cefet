import { generateNodes } from "./nodeHandler.js";

export const setupAstar = (data, heuristic) => {
	const matrix = data.matrix;
	const lines = matrix.length;
	const columns = matrix[0].length;

	const nodes = generateNodes(lines, columns, heuristic, matrix);
	return nodes
}

export const aStar = (nodes, start, end) => {
	const startNode = nodes[start[0]][start[1]]
	const finalNode = nodes[end[0]][end[1]]
	
	let pathCost = {}; // Array de custos
	pathCost[startNode.node_name] = 0;
	
	let openList = [];	 // Lista de nodes visitados e nao expandidos
	let closedList = []; // Lista de nodes visitados e expandidos

	openList.push(startNode);

	do {
		// Definindo o node atual
		let currentNode = openList[0];
		for (let i = 0; i < openList.length; i++) {
			let currentNodeF = pathCost[currentNode.node_name] + currentNode.h_distance[end];
			let openListF = pathCost[openList[i].node_name] + openList[i].h_distance[end];

			if (openListF < currentNodeF) {
				currentNode = openList[i];
			}
		}

		// Removendo o node atual da lista de nodes nao expandidos e adicionando a lista de nodes expandidos
		openList = openList.filter((node) => node != currentNode);
		closedList.push(currentNode);

		// Verificando se o node atual eh o node final e retornando o caminho
		if (currentNode == finalNode) {
			let path = [];
			let node = currentNode;
			while (node != startNode) {
				path.push(node);
				node = node.parent;
			}
			path.push(startNode);
			path.reverse();
			return [path, pathCost[currentNode.node_name]];
		}

		// Expansao do node atual
		for (let i = 0; i < currentNode.neighbors.length; i++) {
			// Definindo o vizinho atual
			let neighbor = currentNode.neighbors[i]; 
			// Verificando se o node vizinho nao esta na lista de nodes expandidos
			if (!closedList.includes(neighbor.node)) { 
				// Verificando se o node vizinho nao esta na lista de nodes nao expandidos
				if (!openList.includes(neighbor.node)) {
					// Definindo o node atual como o pai do node vizinho
					neighbor.node.parent = currentNode; 
					// Adicionando o node vizinho na lista de nodes nao expandidos
					openList.push(neighbor.node); 
					// Definindo o custo do node vizinho
					pathCost[neighbor.node.node_name] = pathCost[currentNode.node_name] + neighbor.g_distance; 
				}
			}

			// Verificando se o custo do node vizinho eh maior que o custo do node atual + a distancia do node atual para o node vizinho
			if (pathCost[neighbor.node.node_name] > pathCost[currentNode.node_name] + neighbor.g_distance) { 
				// Definindo o node atual como o pai do node vizinho
				neighbor.node.parent = currentNode; 
				// Definindo o custo do node vizinho
				pathCost[neighbor.node.node_name] = pathCost[currentNode.node_name] + neighbor.g_distance; 

				// Verificando se o node vizinho esta na lista de nodes expandidos
				if (closedList.includes(neighbor.node)) { 
					// Removendo o node vizinho da lista de nodes expandidos
					closedList = closedList.filter((node) => node != neighbor.node); 

					// Adicionando o node vizinho na lista de nodes nao expandidos
					openList.push(neighbor.node); 
				}
			}

		}
	} while (openList.length > 0);
};
