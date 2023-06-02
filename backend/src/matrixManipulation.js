import manhattanDistance from './util/manhattanDistance.js';

export const findSnakeAndFoods = (data) => {
  const matrix = data.matrix;
  // console.log(matrix)

  const lines = matrix.length;
  const columns = matrix[0].length;
  
  let result = {
    snakeHead: [],
    foods: [],
  };

  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j].snakeHead) {
        result.snakeHead = [i,j];
      } else if (matrix[i][j].food) {
        result.foods.push([i,j]);
      }
    }
  }

  // console.log("snakeHead:", snakeHead, "  |  ","food:", food)

  return result;
}



/*
  Recebe uma matriz de dados e retorna uma matriz de distancias de manhattan.
  A matriz de dados deve set SEMPRE uma matrix NxN e ter o seguinte formato:
  {
    matrix: [
      [{snakeHead: true | false, food: true | false}, ..., {snakeHead: true | false, food: true | false}],
      ...
      [{snakeHead: true | false, food: true | false}, ..., {snakeHead: true | false, food: true | false}],
    ]
  }
  O retorno será uma matriz NxN com a distancia de manhattan de cada ponto para a cabeça da cobra.

  Exemplo:
    DataMatrix: 
      {
        matrix: [
          [{snakeHead: false, food:TRUE} , [{snakeHead: false, food:false}, {snakeHead: false, food:TRUE}] , {snakeHead: false, food:false}],
          [{snakeHead: false, food:false}, [{snakeHead: false, food:false}, {snakeHead: false, food:false}], {snakeHead: false, food:false}],
          [{snakeHead: false, food:false}, [{snakeHead: TRUE, food:false} , {snakeHead: false, food:false}], {snakeHead: false, food:TRUE} ],
          [{snakeHead: false, food:false}, [{snakeHead: false, food:false}, {snakeHead: false, food:false}], {snakeHead: false, food:false}],
        ]
      }
    ManhattanMatrix:
      {
        matrix: [
          [3, 2, 3, 4],
          [2, 1, 2, 3],
          [1, 0, 1, 2],
          [2, 1, 2, 3],
        ]
      }
*/
export const dataMatrixToManhattanMatrix = (data, snakeHead) => {
  const matrix = data.matrix;
  // console.log(matrix)

  const lines = matrix.length;
  const columns = matrix[0].length;

  // Calculando a matriz de distancias de manhattan
  let manhattanMatrix = [];

  for (let i = 0; i < lines; i++) {
    manhattanMatrix.push([]);
    for (let j = 0; j < columns; j++) {
      manhattanMatrix[i].push(manhattanDistance(i, j, snakeHead[0], snakeHead[1]));
    }
  }

  // console.log(manhattanMatrix)

  return manhattanMatrix;
}