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
  let currentCell = snakeAndFoods.snakeHead;
  for (let i = 0; i < result.fitness; i++) {
    const foodPosition = nextFood.position;
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
      nextFood = result.foods_order[index];
    }
  }

  console.log(directions)

  return directions;
};
