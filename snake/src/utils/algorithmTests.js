import { findSnakeAndFoods } from './utils.js'
import { executeGeneticAlgorithm } from '../GeneticAlgorithmFoods/GeneticAlgorithm.js'

const mockData = {
  matrix: [ 
    [{snakeHead: false, food:true}, {snakeHead: false, food:false}, {snakeHead: false, food:true}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
		[{snakeHead: false, food:false}, {snakeHead: true, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:true}],
		[{snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}, {snakeHead: false, food:false}],
  ]
}

const snakeAndFoods = findSnakeAndFoods(mockData)
console.log(snakeAndFoods, "\n")
executeGeneticAlgorithm(mockData, snakeAndFoods.snakeHead, snakeAndFoods.foods)

