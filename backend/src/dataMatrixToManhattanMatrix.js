import manhattanDistance from './util/manhattanDistance.js';

/*
  Recebe uma matriz de dados e retorna uma matriz de distancias de manhattan
  A matriz de dados deve set SEMPRE uma matrix NxN e ter o seguinte formato:
  {
    matrix: [
      [{snakeHead: false, apple:true}, ..., {snakeHead: false, apple:false}],
      ...
      [{snakeHead: false, apple:false}, ..., {snakeHead: false, apple:false}],
    ]
  }
  O retorno será uma matriz NxN com a distancia de manhattan de cada ponto para a cabeça da cobra.

  Exemplo:
    DataMatrix: 
      {
        matrix: [
          [{snakeHead: false, apple:true}, [{snakeHead: false, apple:true}, {snakeHead: false, apple:false}], {snakeHead: false, apple:false}],
          [{snakeHead: false, apple:true}, [{snakeHead: false, apple:true}, {snakeHead: false, apple:false}], {snakeHead: false, apple:false}],
          [{snakeHead: false, apple:true}, [{snakeHead: false, apple:true}, {snakeHead: false, apple:false}], {snakeHead: false, apple:false}],
          [{snakeHead: false, apple:true}, [{snakeHead: false, apple:true}, {snakeHead: false, apple:false}], {snakeHead: false, apple:false}],
        ]
      }
    ManhattanMatrix:
      {
        matrix: [
          [3, 2, 1, 2],
          [2, 1, 0, 1],
          [1, 0, 1, 2],
          [2, 1, 2, 3],
        ]
      }
*/

export const dataMatrixToManhattanMatrix = (data) => {
  const matrix = data.matrix;

  // console.log(matrix)

  const lines = matrix.length;
  const columns = matrix[0].length;

  // Encontrar a cabeça da cobra e as maçãs
  let snakeHead = [];
  let apple = [];

  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j].snakeHead) {
        snakeHead = [i,j];
      } else if (matrix[i][j].apple) {
        apple.push([i,j]);
      }
    }
  }

  console.log("snakeHead:", snakeHead, "     |     ","apple:", apple)

  // Calculando a matriz de distancias de manhattan
  let manhattanMatrix = [];

  for (let i = 0; i < lines; i++) {
    manhattanMatrix.push([]);
    for (let j = 0; j < columns; j++) {
      manhattanMatrix[i].push(manhattanDistance(i, j, snakeHead[0], snakeHead[1]));
    }
  }

  console.log(manhattanMatrix)

  return dataMatrixToManhattanMatrix;
}