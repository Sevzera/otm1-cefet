import React, { useState, useEffect } from "react";
import { getAstarDirections } from "./Astar/index";
import { RunGeneticAlgorithWithFoods } from "./GeneticAlgorithmFoods/RunAlgorithm";

const getRandomFoods = (INITIAL_SNAKE) => {
  const randomFoods = [];
  while (randomFoods.length < FOOD_COUNT) {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    if (
      !randomFoods.some((f) => f.x === newFood.x && f.y === newFood.y) &&
      !INITIAL_SNAKE.some((s) => s.x === newFood.x && s.y === newFood.y)
    ) {
      randomFoods.push(newFood);
    }
  }
  return randomFoods;
};

const BOARD_SIZE = 50;
const INITIAL_SNAKE = [
  { x: Math.floor(BOARD_SIZE / 2), y: Math.floor(BOARD_SIZE / 2) },
];
const FOOD_COUNT = 25;
const INITIAL_FOODS = getRandomFoods(INITIAL_SNAKE);
const SPEED_IN_MS = 50;

const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
const DIRECTION_ARRAY = Object.values(DIRECTION);

const RANDOM_DIRECTIONS = [];
const RANDOM_DIRECTIONS_LENGTH = 100;
while (RANDOM_DIRECTIONS.length < RANDOM_DIRECTIONS_LENGTH) {
  const randomIndex = Math.floor(Math.random() * DIRECTION_ARRAY.length);
  RANDOM_DIRECTIONS.push(DIRECTION_ARRAY[randomIndex]);
}

const ASTAR_DIRECTIONS = getAstarDirections(
  BOARD_SIZE,
  INITIAL_SNAKE[0],
  INITIAL_FOODS
);

const GENETIC_ALGORITHM_DIRECTIONS = RunGeneticAlgorithWithFoods(
  BOARD_SIZE,
  INITIAL_SNAKE[0],
  INITIAL_FOODS
)

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
        const nextDirection = GENETIC_ALGORITHM_DIRECTIONS.shift();
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