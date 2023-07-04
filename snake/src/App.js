import React, { useState, useEffect } from "react";

import { RunGeneticAlgorithWithFoods } from "./GeneticAlgorithmFoods/RunAlgorithm";
import { translateBestSolution } from "./utils/utils";

import { ARRAY_OF_FOODS_50x50_150, best_solution_20, best_solution_35, best_solution_50, best_solution_65, best_solution_80 } from "./data.js";

const FOOD_COUNT = 80; //20, 35, 50, 65, 80 (1h no simplex)

const BEST_SOLUTION = true

const getFoods = () => {
  let ARRAY_OF_FOODS = [];
  ARRAY_OF_FOODS = ARRAY_OF_FOODS_50x50_150;
  return ARRAY_OF_FOODS.slice(0, FOOD_COUNT).map((food) => {
    return { x: food[0], y: food[1] };
  });
};

const BOARD_SIZE = 50;
const INITIAL_SNAKE = [{ x: BOARD_SIZE/2, y: BOARD_SIZE/2 }];
const INITIAL_FOODS = getFoods();
const SPEED_IN_MS = 10;

const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
const DIRECTION_ARRAY = Object.values(DIRECTION);

// const RANDOM_DIRECTIONS = [];
// const RANDOM_DIRECTIONS_LENGTH = 100;
// while (RANDOM_DIRECTIONS.length < RANDOM_DIRECTIONS_LENGTH) {
//   const randomIndex = Math.floor(Math.random() * DIRECTION_ARRAY.length);
//   RANDOM_DIRECTIONS.push(DIRECTION_ARRAY[randomIndex]);
// }

let RESULT_DIRECTIONS = [];

if (BEST_SOLUTION) {
  if (FOOD_COUNT === 20) RESULT_DIRECTIONS = translateBestSolution(best_solution_20, INITIAL_FOODS, INITIAL_SNAKE);
  if (FOOD_COUNT === 35) RESULT_DIRECTIONS = translateBestSolution(best_solution_35, INITIAL_FOODS, INITIAL_SNAKE);
  if (FOOD_COUNT === 50) RESULT_DIRECTIONS = translateBestSolution(best_solution_50, INITIAL_FOODS, INITIAL_SNAKE);
  if (FOOD_COUNT === 65) RESULT_DIRECTIONS = translateBestSolution(best_solution_65, INITIAL_FOODS, INITIAL_SNAKE);
  if (FOOD_COUNT === 80) RESULT_DIRECTIONS = translateBestSolution(best_solution_80, INITIAL_FOODS, INITIAL_SNAKE);
} else {
  const [INDIVIDUAL, GENETIC_ALGORITHM_DIRECTIONS] = RunGeneticAlgorithWithFoods(
    BOARD_SIZE,
    INITIAL_SNAKE[0],
    INITIAL_FOODS
  );
  RESULT_DIRECTIONS = GENETIC_ALGORITHM_DIRECTIONS;
}

const getNewHead = (currentHead, direction) => {
  let newHead = { ...currentHead };

  if (direction === DIRECTION.UP) {
    newHead.y = (newHead.y - 1 + BOARD_SIZE) % BOARD_SIZE;
  } else if (direction === DIRECTION.DOWN) {
    newHead.y = (newHead.y + 1) % BOARD_SIZE;
  } else if (direction === DIRECTION.LEFT) {
    newHead.x = (newHead.x - 1 + BOARD_SIZE) % BOARD_SIZE;
  } else if (direction === DIRECTION.RIGHT) {
    newHead.x = (newHead.x + 1) % BOARD_SIZE;
  }

  return newHead;
};

const App = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [direction, setDirection] = useState(DIRECTION.RIGHT);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 38 && direction !== DIRECTION.DOWN) {
        setDirection(DIRECTION.UP);
      } else if (event.keyCode === 40 && direction !== DIRECTION.UP) {
        setDirection(DIRECTION.DOWN);
      } else if (event.keyCode === 37 && direction !== DIRECTION.RIGHT) {
        setDirection(DIRECTION.LEFT);
      } else if (event.keyCode === 39 && direction !== DIRECTION.LEFT) {
        setDirection(DIRECTION.RIGHT);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        // const nextDirection = direction;
        // const nextDirection = RANDOM_DIRECTIONS.shift();
        const nextDirection = RESULT_DIRECTIONS.shift();
        const newHead = getNewHead(prevSnake[0], nextDirection);
        const newSnake = [...prevSnake];
        newSnake.unshift(newHead);

        if (
          foods.some((food) => food.x === newHead.x && food.y === newHead.y)
        ) {
          setFoods((prevFoods) =>
            prevFoods.filter(
              (food) => !(food.x === newHead.x && food.y === newHead.y)
            )
          );
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED_IN_MS);

    return () => clearInterval(moveSnake);
  }, [snake, foods]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[900px] h-[900px]">
        <div className="h-full w-full flex gap-1">
          {Array.from({ length: BOARD_SIZE }).map((_, x) => {
            return (
              <div className="h-full w-full flex flex-col gap-1">
                {Array.from({ length: BOARD_SIZE }).map((_, y) => {
                  const isSnake = snake.some(
                    (cell) => cell.x === x && cell.y === y
                  );
                  const isFood = foods.some(
                    (cell) => cell.x === x && cell.y === y
                  );
                  return (
                    <div
                      className={`w-full h-full ${
                        isSnake
                          ? "bg-black"
                          : INITIAL_SNAKE[0].x === x && INITIAL_SNAKE[0].y === y
                          ? "bg-red-500"
                          : isFood
                          ? "bg-green-500"
                          : "bg-gray-200"
                      } border border-gray-300`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
