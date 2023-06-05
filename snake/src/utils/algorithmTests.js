import { findSnakeAndFoods } from "./utils.js"
import { executeGeneticAlgorithm } from "../GeneticAlgorithm/GeneticAlgorithm.js"

const mockData = {
  matrix: [ 
    [{snakeHead: false, food:true}, {snakeHead: false, food:false}, {snakeHead: false, food:true}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: true, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:true}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
  ]
}

const snakeAndFoods = findSnakeAndFoods(mockData)
console.log(snakeAndFoods)
executeGeneticAlgorithm(mockData.matrix, snakeAndFoods.snakeHead, snakeAndFoods.foods)

