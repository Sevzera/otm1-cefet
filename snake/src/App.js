import React, { useState, useEffect } from "react";
import { getAstarDirections } from "./Astar/index";
import { RunGeneticAlgorithWithFoods } from "./GeneticAlgorithmFoods/RunAlgorithm";

const ARRAY_OF_FOODS = [
  [13, 47], [29, 2] , [6, 34] , [41, 19], [8, 11] , 
  [14, 23], [36, 45], [9, 7]  , [28, 33], [17, 39],
  [3, 18] , [41, 4] , [26, 11], [35, 25], [48, 32],
  [21, 13], [37, 22], [10, 46], [44, 1] , [15, 29],
  [2, 38] , [40, 16], [24, 5] , [8, 31] , [49, 20],
  [7, 42] , [19, 16], [33, 28], [25, 6] , [12, 35],
  [30, 23], [1, 44] , [46, 11], [21, 39], [14, 17],
  [48, 32], [5, 20] , [36, 8] , [9, 25] , [40, 13],
  [24, 37], [3, 46] , [29, 4] , [17, 22], [43, 30],
  [8, 15] , [26, 41], [38, 19], [11, 33], [31, 2] ,
];
const FOOD_COUNT = 50; //5, 25, 50

const getFoods = () => {
  return ARRAY_OF_FOODS.slice(0, FOOD_COUNT).map((food) => {
    return { x: food[0], y: food[1] };
  });
};

const BOARD_SIZE = 50;
const INITIAL_SNAKE = [
  { x: 25, y: 25 },
];
const INITIAL_FOODS = getFoods();
const SPEED_IN_MS = 10;

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

const [INDIVIDUAL, GENETIC_ALGORITHM_DIRECTIONS] = RunGeneticAlgorithWithFoods(
  BOARD_SIZE,
  INITIAL_SNAKE[0],
  INITIAL_FOODS
);

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
                          : INITIAL_SNAKE[0].x === x && INITIAL_SNAKE[0].y === y
                          ? "bg-red-500"
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
