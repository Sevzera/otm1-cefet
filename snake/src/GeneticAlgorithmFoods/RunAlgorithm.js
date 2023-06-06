import { executeGeneticAlgorithm } from "./GeneticAlgorithm";
import { findSnakeAndFoods } from "../utils/utils";

export const RunGeneticAlgorithWithFoods = (boardSize, headCoords, foodCoords) => {
  const matrix = Array.from({ length: boardSize }, (_, i) =>
    Array.from({ length: boardSize }, (_, j) => ({
      snakeHead: i === headCoords.x && j === headCoords.y,
      food: foodCoords.some((food) => food.x === j && food.y === i),
    }))
  );

  const snakeAndFoods = findSnakeAndFoods({ matrix });
  const result = executeGeneticAlgorithm({ matrix }, snakeAndFoods.snakeHead, snakeAndFoods.foods);
  // console.log(result);

  const directions = [];
  let index = 0;
  let nextFood = result.foods_order[index];
  let foodPosition = nextFood.position;``
  let currentCell = snakeAndFoods.snakeHead;
  let stop = false;
  while(stop === false) {
    if (currentCell[0] !== foodPosition[0]) {
      if (currentCell[0] > foodPosition[0]) {
        directions.push("UP");
        currentCell[0]--;
      } 
      else if (currentCell[0] < foodPosition[0]) {
        directions.push("DOWN");
        currentCell[0]++;
      }
    } 
    else if (currentCell[1] !== foodPosition[1]) {
      if (currentCell[1] > foodPosition[1]) {
        directions.push("LEFT");
        currentCell[1]--;
      }
      else if (currentCell[1] < foodPosition[1]) {
        directions.push("RIGHT");
        currentCell[1]++;
      }
    } else {
      index++;
      if (index === result.foods_order.length) {
        stop = true;
        break;
      }
      nextFood = result.foods_order[index];
      foodPosition = nextFood.position;
    }
  }

  console.log(directions)

  return directions;
};
