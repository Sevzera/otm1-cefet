export const manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

export const findSnakeAndFoods = (data) => {
  const matrix = data.matrix;
  // console.log(matrix)

  let result = {
    snakeHead: [],
    foods: [],
  };

  const lines = matrix.length;
  const columns = matrix[0].length;

  // Encontrando a cabeça da cobra e as comidas
  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j].snakeHead) {
        result.snakeHead.push([j, i]);
      }
      if (matrix[i][j].food) {
        result.foods.push([j, i]);
      }
    }
  }

  // console.log("snakeHead:", result.snakeHead,"\nfood:", result.foods)

  return result;
};

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
export const dataMatrixToManhattanMatrix = (data, object) => {
  const matrix = data.matrix;
  // console.log(matrix)

  const lines = matrix.length;
  const columns = matrix[0].length;

  // Calculando a matriz de distancias de manhattan
  let manhattanMatrix = [];

  for (let i = 0; i < lines; i++) {
    manhattanMatrix.push([]);
    for (let j = 0; j < columns; j++) {
      manhattanMatrix[i].push(
        manhattanDistance(j, i, object[1], object[0])
      );
    }
  }

  // console.log(manhattanMatrix)

  return manhattanMatrix;
};
