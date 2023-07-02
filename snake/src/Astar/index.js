import { findSnakeAndFoods, dataMatrixToManhattanMatrix } from "../utils/utils";
import { setupAstar, aStar } from "./Astar";

/* ASTAR */
export function executeAstar(data) {
  let snakeAndFoods = findSnakeAndFoods(data);
  let manhattanMatrix = dataMatrixToManhattanMatrix(
    data,
    snakeAndFoods.snakeHead
  );
  const AstarNodes = setupAstar(data, manhattanMatrix);

  const foodsQty = snakeAndFoods.foods.length;
  let result = [];
  let paths = [];
  let bestPath = null;

  for (let i = 0; i < foodsQty; i++) {
    // Reseta as matrizes todas e as posições da cobra e comida
    paths = [];
    bestPath = null;
    snakeAndFoods = findSnakeAndFoods(data);
    manhattanMatrix = dataMatrixToManhattanMatrix(
      data,
      snakeAndFoods.snakeHead
    );

    // Executa o A* para cada comida
    for (let j = 0; j < snakeAndFoods.foods.length; j++) {
      paths.push(
        aStar(AstarNodes, snakeAndFoods.snakeHead, snakeAndFoods.foods[j])
      );
    }

    // Pega a comida com o menor custo
    paths.sort((a, b) => a[1] - b[1]);
    result.push(paths[0]);
    bestPath = paths[0][0][paths[0][0].length - 1];

    // "Removendo" uma comida
    data.matrix[bestPath.positionInMatrix.row][
      bestPath.positionInMatrix.column
    ].food = false;

    // Alterando a posicao inicial da cobra
    data.matrix[snakeAndFoods.snakeHead[0]][
      snakeAndFoods.snakeHead[1]
    ].snakeHead = false;
    data.matrix[bestPath.positionInMatrix.row][
      bestPath.positionInMatrix.column
    ].snakeHead = true;
  }

  return result;
}

export const getAstarDirections = (boardSize, headCoords, foodCoords) => {
  const matrix = Array.from({ length: boardSize }, (_, i) =>
    Array.from({ length: boardSize }, (_, j) => ({
      snakeHead: i === headCoords.x && j === headCoords.y,
      food: foodCoords.some((food) => food.x === j && food.y === i),
    }))
  );

  const result = executeAstar({ matrix });
  const paths = result.map((path) =>
    path[0].map((node) => node.positionInMatrix)
  );

  const directions = [];
  for (let i = 0; i < paths.length; i++) {
    for (let j = 0; j < paths[i].length; j++) {
      const currentCell = paths[i][j];
      const nextCell = paths[i][j + 1];
      if (!nextCell) break;
      if (currentCell.row !== nextCell.row) {
        if (currentCell.row > nextCell.row) directions.push("UP");
        else if (currentCell.row < nextCell.row) directions.push("DOWN");
      } else if (currentCell.column !== nextCell.column) {
        if (currentCell.column > nextCell.column) directions.push("LEFT");
        else if (currentCell.column < nextCell.column) directions.push("RIGHT");
      }
    }
  }

  return directions;
};
