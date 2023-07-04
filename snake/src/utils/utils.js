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
      manhattanMatrix[i].push(manhattanDistance(j, i, object[1], object[0]));
    }
  }

  // console.log(manhattanMatrix)

  return manhattanMatrix;
};

export const translateBestSolution = (bestSolution, foods, snake) => {
  const directions = [];
  let stop = false;
  let index = 0;

  let currentSolutionCell = bestSolution[0];
  console.log(currentSolutionCell);

  let currentPosition = 0;
  if (currentSolutionCell[0] == 1)
    currentPosition = { x: snake[0].x, y: snake[0].y };
  else currentPosition = foods[currentSolutionCell[0] - 2];

  let foodPosition = 0;
  if (currentSolutionCell[1] == 1)
    foodPosition = { x: snake[0].x, y: snake[0].y };
  else foodPosition = foods[currentSolutionCell[1] - 2];
  console.log("Head: ", currentPosition, "\nFood: ", foodPosition);

  while (stop == false) {
    if (currentPosition.y !== foodPosition.y) {
      if (currentPosition.y > foodPosition.y) {
        directions.push("UP");
        currentPosition.y--;
      } else if (currentPosition.y < foodPosition.y) {
        directions.push("DOWN");
        currentPosition.y++;
      }
    } else if (currentPosition.x !== foodPosition.x) {
      if (currentPosition.x > foodPosition.x) {
        directions.push("LEFT");
        currentPosition.x--;
      } else if (currentPosition.x < foodPosition.x) {
        directions.push("RIGHT");
        currentPosition.x++;
      }
    } else {
      index++;
      currentSolutionCell = bestSolution.find((element) => {
        if (element[0] == currentSolutionCell[1]) return element;
      });

      console.log(currentSolutionCell);

      if (index == bestSolution.length) {
        stop = true;
        break;
      }

      if (currentSolutionCell[0] == 1)
        currentPosition = { x: snake[0].x, y: snake[0].y };
      else currentPosition = foods[currentSolutionCell[0] - 2];

      if (currentSolutionCell[1] == 1)
        foodPosition = { x: snake[0].x, y: snake[0].y };
      else foodPosition = foods[currentSolutionCell[1] - 2];
      console.log("Head: ", currentPosition, "\nFood: ", foodPosition);
    }
  }
  console.log(directions);
  return directions;
};
