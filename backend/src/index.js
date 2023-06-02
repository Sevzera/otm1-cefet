import express from "express";

import { dataMatrixToManhattanMatrix } from "./dataMatrixToManhattanMatrix.js";

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
    [{snakeHead: false, apple:true}, {snakeHead: false, apple:false}, {snakeHead: false, apple:true}, {snakeHead: false, apple:false}],
		[{snakeHead: false, apple:false}, {snakeHead: false, apple:false}, {snakeHead: false, apple:false}, {snakeHead: false, apple:false}],
		[{snakeHead: false, apple:false}, {snakeHead: true, apple:false}, {snakeHead: false, apple:false}, {snakeHead: false, apple:true}],
		[{snakeHead: false, apple:false}, {snakeHead: false, apple:false}, {snakeHead: false, apple:false}, {snakeHead: false, apple:false}],
  ]
}

dataMatrixToManhattanMatrix(mockData)
