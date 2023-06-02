import express from "express";

import { findSnakeAndFoods, dataMatrixToManhattanMatrix } from "./matrixManipulation.js";
import { aStar, setupAstar } from "./Astar/Astar.js";

const app = express();
const PORT = process.env.PORT || 8888;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// app.listen(PORT, function () {
//   console.log('Server is listening on:',PORT);
// });

const mockData = {
  matrix: [ 
    [{snakeHead: false, food:true}, {snakeHead: false, food:false}, {snakeHead: false, food:true}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: true, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:true}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
  ]
}

/* ASTAR */
function executeAstar(data) {
  let snakeAndFoods = findSnakeAndFoods(mockData)
  // console.log("snakeAndFoods:", snakeAndFoods)
  let manhattanMatrix = dataMatrixToManhattanMatrix(data, snakeAndFoods.snakeHead)
  const AstarNodes = setupAstar(data, manhattanMatrix)
  // console.log("AstarNodes:", AstarNodes)

  const foodsQty = snakeAndFoods.foods.length
  let result = []
  let paths = []
  let bestPath = null
  for (let i = 0; i < foodsQty; i++) {
    paths = []
    bestPath = null
    snakeAndFoods = findSnakeAndFoods(mockData)
    manhattanMatrix = dataMatrixToManhattanMatrix(data, snakeAndFoods.snakeHead)
    // console.log("manhattanMatrix:", manhattanMatrix)
    for (let j = 0; j < snakeAndFoods.foods.length; j++) {
      paths.push(aStar(AstarNodes, snakeAndFoods.snakeHead, snakeAndFoods.foods[j]))
    }
    paths.sort((a, b) => a[1] - b[1])
    result.push(paths[0])
    bestPath = paths[0][0][paths[0][0].length - 1]
    data.matrix[bestPath.positionInMatrix.x][bestPath.positionInMatrix.y].food = false
    data.matrix[snakeAndFoods.snakeHead[0]][snakeAndFoods.snakeHead[1]].snakeHead = false    
    data.matrix[bestPath.positionInMatrix.x][bestPath.positionInMatrix.y].snakeHead = true
  }
  return result
}

const aStarResult = executeAstar(mockData)
console.log("aStarResult:", aStarResult)
for (let i = 0; i < aStarResult.length; i++) {
  console.log(`aStarResult[${i}]:`, aStarResult[i][0], "\n\n")
}
  