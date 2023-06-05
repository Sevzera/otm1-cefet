import { Individual } from './GeneticIndividual.js'

const POPULATION_SIZE = 20
const MAX_GENERATIONS = 2000
let actual_generation = 1
const MAX_MOVES = 50

const MUTATION_RATE = 0.05
const CROSSOVER_RATE = 0.5

let GAME_MATRIX = null
let SNAKE = null
let FOODS = null

export const setDefaultValues = (matrix, snake, foods) => {
  GAME_MATRIX = matrix
  SNAKE = snake
  FOODS = foods
}



const sortPopulation = (population) => {
  // Sort the population by fitness
  population.sort((a, b) => {
      return b.foods_eaten - a.foods_eaten || b.fitness - a.fitness
  })
  return population
}



const checkIfFoodEaten = (individual, position, food) => {
  // Get the row and column of the snake
  let row = position[0]
  let col = position[1]

  for (let i = 0; i < food.length; i++) {
    // Get the row and column of the food
    let food_row = food[i][0]
    let food_col = food[i][1]

    // If the snake is on the food
    if (row == food_row && col == food_col) {
      // console.log("      ", "FOOD EATEN", position, food[i])
      individual.foods_eaten += 1
      food = food.filter((item) => item != food[i])
      return [true, food]
    }
  }
  return [false, food]
}



const executeMove = (move, row, col) => {
  // If the move is up
  if (move == 0) {
    // console.log('up')
    row -= 1
    if (row < 0) {
      row = 0
    }
  }
  // If the move is down
  else if (move == 1) {
    // console.log('down')
    row += 1
    if (row >= GAME_MATRIX.length) {
      row = GAME_MATRIX.length - 1
    }
  }
  // If the move is left
  else if (move == 2) {
    // console.log('left')
    col -= 1
    if (col < 0) {
      col = 0
    }
  }
  // If the move is right
  else if (move == 3) {
    // console.log('right')
    col += 1
    if (col >= GAME_MATRIX[0].length) {
      col = GAME_MATRIX[0].length - 1
    }
  }

  return [row, col]
}



const executeMoves = (individual) => {
  let auxSnake = SNAKE.slice()
  let row = auxSnake[0]
  let col = auxSnake[1]
  let auxFood = FOODS.slice()
  
  // console.log(individual)

  // Get the moves for the individual
  let moves = individual.moves
  let position = 0
  let result = 0

  // For each move
  for (let i = 0; i < moves.length; i++) {
    if (position != 0) {
      row = position[0]
      col = position[1]
    }

    // Get the move
    let move = moves[i]

    // Execute the move and check if food was eaten
    position = executeMove(move, row, col)
    // console.log("   ", "POSITION: ",position)
    result = checkIfFoodEaten(individual, position, auxFood)
    auxFood = result[1]
    // console.log("   ", "FOODS:", auxFood, "\n")
  }
  // console.log(individual)
  // console.log("\n\n")
}



const generateMoves = (max_moves) => {
  let moves = []

  // Generate a random number of moves
  let num_moves = Math.floor(Math.random() * max_moves)
  
  // For each move
  for (let i = 0; i < num_moves; i++) {
      // Generate a random move --> 0, 1, 2, or 3 (up, down, left, or right)
      let move = Math.floor(Math.random() * 4)
      moves.push(move)
  }

  return moves
}



const fitness = (individual) => {
    // Extract the number of foods eaten and the path length from the individual
    let foods_eaten = individual.foods_eaten
    let path_length = individual.moves.length

    // Assign points for foods eaten
    let score = foods_eaten * 10

    // Subtract points for path length
    score -= path_length

    individual.fitness = score

    return score
}



const linearMapping = (i) => {
  let min = 0
  let max = POPULATION_SIZE

  let result = min + (max - min) * ((POPULATION_SIZE - i) / (POPULATION_SIZE - 1))
  return Math.round(result)
}



const selection = (population) => {
  population = sortPopulation(population)
 
  for (let i = 0; i < population.length; i++) {
    population[i].mapped_fitness = linearMapping(i)
  }

  let nsum = 0
  for (let i = 0; i < population.length; i++) {
    nsum += i
  }

  let parents = []
  for (let i = 0; i < population.length; i++) {
    let odd = Math.round(Math.random() * nsum)
    let sum = 0
    let auxJ = 0
    for (let j = 0; j < population.length; j++) {
      sum += j
      if (sum >= odd) {
        auxJ = j
        break
      }
    }
    
    let aux = null
    for (let k = 0; k < population.length; k++) {
      if (population[k].mapped_fitness == auxJ) {
        parents.push(population[k])
        aux = population[k]
        break
      }
    }
    if (aux == null) {
      parents.push(population[0])
    }
  }

  return parents
}



const crossover = (population) => {
    // Create a new population
    let new_population = []

    // For each pair of individuals in the population
    for (let i = 0; i < population.length; i += 2) {
        if (Math.random() < CROSSOVER_RATE) {
          // Get the first individual
          let individual_1 = population[i]

          // Get the second individual
          let individual_2 = population[i + 1]

          // Get the moves from the first individual
          let moves = individual_1.moves

          // Get the first part of the moves
          let first_half_1 = moves.slice(0, moves.length * CROSSOVER_RATE)
          let first_half_2 = moves.slice(0, moves.length * CROSSOVER_RATE)

          // Get the moves from the second individual
          moves = individual_2.moves

          // Get the second part of the moves
          let second_half_1 = moves.slice(moves.length * CROSSOVER_RATE)
          let second_half_2 = moves.slice(moves.length * CROSSOVER_RATE)

          // Combine the first and second parts of the moves
          let moves_1 = first_half_1.concat(second_half_2)
          let moves_2 = first_half_2.concat(second_half_1)

          // Create a new individual
          let new_individual_1 = new Individual(moves_1)
          let new_individual_2 = new Individual(moves_2)

          // Add the new individual to the new population
          new_population.push(new_individual_1)
          new_population.push(new_individual_2)
        }
        else {
          let individual_1 = new Individual(population[i].moves)
          let individual_2 = new Individual(population[i+1].moves)
          new_population.push(individual_1)
          new_population.push(individual_2)
        }
    }

    return new_population
}



const mutation = (population) => {
    // For each individual in the population
    for (let i = 0; i < population.length; i++) {
        // Get the moves for the individual
        let moves = population[i].moves

        // For each move in the individual's moves
        for (let j = 0; j < moves.length; j++) {
            // Get the move
            let move = moves[j]

            // Generate a random number between 0 and 1
            let random = Math.random()

            // If the random number is less than 0.05
            if (random < MUTATION_RATE) {
                // Generate a new move --> 0, 1, 2, or 3 (up, down, left, or right)
                move = Math.floor(Math.random() * 4)

                // Set the new move
                moves[j] = move
            }
        }
    }

    return population
}



const nextGeneration = (population) => {
  // Get the fitness for each individual in the population
  for (let i = 0; i < population.length; i++) {
    // Get the individual
    let individual = population[i]
    executeMoves(population[i])
    individual.fitness = fitness(individual)
  }

  // console.log("START:", population, "\n\n")

  // Select the parents
  let parents = selection(population)
  // console.log("PARENTS:", parents, "\n\n")

  // Crossover the population
  let children = crossover(parents)
  // console.log("CHILDREN:", children, "\n\n")

  // Mutate the population
  population = mutation(children)
  // console.log("MUTATION:", population, "\n\n")

  return population
}    



export const executeGeneticAlgorithm = (matrix, snake, foods) => {
  setDefaultValues(matrix, snake, foods)

  if (GAME_MATRIX == null || SNAKE == null || FOODS == null) {
    console.log('GAME_MATRIX or SNAKE or FOODS is null')
    return
  }

  // Initialize a population of random individuals with random moves
  let population = []
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let moves = generateMoves(MAX_MOVES)
    population.push(new Individual(moves))
  }
    
  // Evolve the population over multiple generations
  for (let i = 0; i < MAX_GENERATIONS; i++) {
    population = nextGeneration(population)
    actual_generation += 1
  }

  for (let i = 0; i < population.length; i++) {
    // Get the individual
    let individual = population[i]
    executeMoves(population[i])
    individual.fitness = fitness(individual)
  }
  population = sortPopulation(population)

  console.log(population[0])
}