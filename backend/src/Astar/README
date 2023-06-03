*Foi utilizado o código desenvolvido por Arthur e Victor --> https://github.com/Sevzera/ia-cefet/tree/master/atv1_busca-A*

A ideia que pensei que possa funcionar será da seguinte forma:

- Com a matriz que obtemos a partir do algoritmo de manhattan, conseguimos setar os nodes do algoritmo A*, 
  sendo esta matriz os valores heuristicos e os custos reais sempre sendo = 1.

- Como teremos mais de uma maçã, teremos que calcular este algoritmo n vezes (a depender da quantidade de maças).

- Com o algoritmo calculado todas as vezes, teremos um vetor contendo as soluções, bem como o custo total.

- Com o custo calculado, ordenaremos este vetor por custo e pegaremos o menor até chegar na primeira maça.

- Chegando na primeira maça, repetiremos os passos anteriores até que consigamos um caminho ótimo, que mesmo que seja invertido,
  teoricamente, terá o mesmo custo.


# EXEMPLO

Entrada:

const mockData = {
  matrix: [ 
    [{snakeHead: false, food:true}, {snakeHead: false, food:false}, {snakeHead: false, food:true}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: true, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:true}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
  ]
}

Traducao para node_name:
	{
    [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ]
  }

Saida:

aStarResult: [
  [ [ [Object], [Object], [Object] ], 2 ],
  [ [ [Object], [Object], [Object], [Object] ], 3 ],
  [ [ [Object], [Object], [Object] ], 2 ]
]


aStarResult[0]: [
  {
    node_name: 9,
    h_distance: 0,
    real_distance: 1,
    positionInMatrix: { x: 2, y: 1 },
    food: false,
    neighbors: [ [Object], [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 10,
      h_distance: 1,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  {
    node_name: 10,
    h_distance: 1,
    real_distance: 1,
    positionInMatrix: { x: 2, y: 2 },
    food: false,
    neighbors: [ [Object], [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 6,
      h_distance: 2,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  {
    node_name: 11,
    h_distance: 2,
    real_distance: 1,
    positionInMatrix: { x: 2, y: 3 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 10,
      h_distance: 1,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  }
]


aStarResult[1]: [
  {
    node_name: 11,
    h_distance: 2,
    real_distance: 1,
    positionInMatrix: { x: 2, y: 3 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 10,
      h_distance: 1,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  {
    node_name: 7,
    h_distance: 3,
    real_distance: 1,
    positionInMatrix: { x: 1, y: 3 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 6,
      h_distance: 2,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  <ref *1> {
    node_name: 3,
    h_distance: 4,
    real_distance: 1,
    positionInMatrix: { x: 0, y: 3 },
    food: false,
    neighbors: [ [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 2,
      h_distance: 3,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Circular *1],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  <ref *2> {
    node_name: 2,
    h_distance: 3,
    real_distance: 1,
    positionInMatrix: { x: 0, y: 2 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: <ref *1> {
      node_name: 3,
      h_distance: 4,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Circular *2],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  }
]


aStarResult[2]: [
  <ref *1> {
    node_name: 2,
    h_distance: 3,
    real_distance: 1,
    positionInMatrix: { x: 0, y: 2 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 3,
      h_distance: 4,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Circular *1],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  {
    node_name: 1,
    h_distance: 2,
    real_distance: 1,
    positionInMatrix: { x: 0, y: 1 },
    food: false,
    neighbors: [ [Object], [Object], [Object] ],
    visited: false,
    parent: <ref *1> {
      node_name: 2,
      h_distance: 3,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  },
  {
    node_name: 0,
    h_distance: 3,
    real_distance: 1,
    positionInMatrix: { x: 0, y: 0 },
    food: false,
    neighbors: [ [Object], [Object] ],
    visited: false,
    parent: {
      node_name: 1,
      h_distance: 2,
      real_distance: 1,
      positionInMatrix: [Object],
      food: false,
      neighbors: [Array],
      visited: false,
      parent: [Object],
      setNeighbors: [Function: setNeighbors]
    },
    setNeighbors: [Function: setNeighbors]
  }
]