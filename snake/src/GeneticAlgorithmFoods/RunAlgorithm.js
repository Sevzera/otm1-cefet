import { executeGeneticAlgorithm } from "./GeneticAlgorithm";
import { findSnakeAndFoods } from "../utils/utils";

export const RunGeneticAlgorithWithFoods = (boardSize, headCoords, foodCoords) => {
  if (!headCoords || !foodCoords || !boardSize) {
    throw new Error("Missing parameters");
  }
  // console.log("headCoords: ", headCoords, "\nfoodCoords: ", foodCoords)

  const matrix = Array.from({ length: boardSize }, (_, i) =>
    Array.from({ length: boardSize }, (_, j) => ({
      snakeHead: j === headCoords.x && i === headCoords.y,
      food: foodCoords.some((food) => food.x === j && food.y === i),
    }))
  );

  // console.log(matrix)

  const snakeAndFoods = findSnakeAndFoods({ matrix });
  // console.log(snakeAndFoods)
  const result = executeGeneticAlgorithm({ matrix }, [headCoords.x, headCoords.y], snakeAndFoods.foods);
  // console.log(result);

  const directions = [];
  let index = 0;
  let nextFood = result.foods_order[index];
  let foodPosition = nextFood.position;
  let currentCell = snakeAndFoods.snakeHead[0];
  let stop = false;
  while(stop === false) {
  //   console.log("Head: ", currentCell, "\nFood: ", foodPosition)
    if (currentCell[1] !== foodPosition[1]) {
      if (currentCell[1] > foodPosition[1]) {
        directions.push("UP");
        currentCell[1]--;
      } 
      else if (currentCell[1] < foodPosition[1]) {
        directions.push("DOWN");
        currentCell[1]++;
      }
    } 
    else if (currentCell[0] !== foodPosition[0]) {
      if (currentCell[0] > foodPosition[0]) {
        directions.push("LEFT");
        currentCell[0]--;
      }
      else if (currentCell[0] < foodPosition[0]) {
        directions.push("RIGHT");
        currentCell[0]++;
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

  // console.log(directions)

  return [result, directions];
};
