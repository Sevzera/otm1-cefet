import {Individual} from './GeneticIndividual.js'
import {dataMatrixToManhattanMatrix} from '../utils/utils.js'

const POPULATION_SIZE = 300
const MAX_GENERATIONS = 10000

const MUTATION_RATE = 0.03
const CROSSOVER_RATE = 0.6

let GAME_MATRIX = null
let SNAKE = null
let FOODS = []

let SNAKE_OBJECT = null

const setDefaultValues = (data, snake, foods) => {
  GAME_MATRIX = data.matrix
  SNAKE = snake

  SNAKE_OBJECT = {
    position: snake,
    manhattan_distance: dataMatrixToManhattanMatrix(data, snake)
  }

  if (FOODS.length > 0) {
    FOODS = []
  }

  for (let i = 0; i < foods.length; i++) {
    FOODS.push({
      position: foods[i],
      manhattan_distance: dataMatrixToManhattanMatrix(data, foods[i])
    })
  }
}



const printIndividualsAndManhattan = (individuals, quantity=0, showFoods=true) => {
  let howManyToPrint = individuals.length
  if (quantity > 0) {
    howManyToPrint = quantity
  }

  for (let i = 0; i < howManyToPrint; i++) {
    let individual = individuals[i]
    console.log(individual)
    if(showFoods) {
      for (let j = 0; j < individual.foods_order.length; j++) {
        let food = individual.foods_order[j]
        console.log(`Food ${j}:`, food.position)
        console.log("   ", food.manhattan_distance)
      }
    }
    console.log("\n")
  }
}



const generateRandomPath = (foods) => {
  let auxFoods = [...foods]
  let path = []
  for (let i = 0; i < foods.length; i++) {
    let index = Math.floor(Math.random() * auxFoods.length)
    path.push(auxFoods[index])
    auxFoods.splice(index, 1)
  }
  return path
}



const fitness = (individual) => {
  let path = individual.foods_order
  let path_cost = 0

  let startPostion = SNAKE
  for (let i = 0; i < path.length; i++) {
    let food = path[i]
    path_cost += food.manhattan_distance[startPostion[0]][startPostion[1]]
    startPostion = food.position
  }

  return path_cost
}



const linearMapping = (i) => {
  let min = 0
  let max = POPULATION_SIZE

  let result = min + (max - min) * ((POPULATION_SIZE - i) / (POPULATION_SIZE - 1))
  return Math.round(result)
}



const sortPopulation = (population) => {
  // Sort the population by fitness
  population.sort((a, b) => {
      return a.fitness - b.fitness
  })
  return population
}



const selection = (population) => {
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



const pmx = (parent1, parent2) => {

  if (parent1.length != parent2.length) {
    console.log("Parents have different sizes")
    return
  }

  let child1 = []
  let child2 = []

  let start = Math.floor(Math.random() * (parent1.length-1))
  let end = Math.floor(Math.random() * (parent1.length-1))
  if (start > end) {
    let aux = start
    start = end
    end = aux
  }

  for (let i = 0; i < parent1.length; i++) {
    if (i >= start && i <= end) {
      child1.push(parent1[i])
      child2.push(parent2[i])
    } else {
      child1.push(null)
      child2.push(null)
    }
  }

  for (let i = 0; i < parent1.length; i++) {
    if (i >= start && i <= end) {
      continue
    }

    let aux = parent2[i]
    let index = parent1.indexOf(aux)
    while (child1[index] != null) {
      aux = parent2[index]
      index = parent1.indexOf(aux)
    }
    child1[index] = parent1[i]
  }

  for (let i = 0; i < parent1.length; i++) {
    if (i >= start && i <= end) {
      continue
    }

    let aux = parent1[i]
    let index = parent2.indexOf(aux)
    while (child2[index] != null) {
      aux = parent1[index]
      index = parent2.indexOf(aux)
    }
    child2[index] = parent2[i]
  }

  return [child1, child2]
}



const crossover = (parents) => {
  let children = []
  for (let i = 0; i < parents.length; i += 2) {
    let parent1 = parents[i]
    let parent2 = parents[i + 1]

    let odd = Math.random()
    if (odd <= CROSSOVER_RATE) {
      let [child1, child2] = pmx(parent1.foods_order, parent2.foods_order)
      children.push(new Individual(child1))
      children.push(new Individual(child2))
    } else {
      children.push(parent1)
      children.push(parent2)
    }
  }
  return children
}



const mutation = (children) => {
  for (let i = 0; i < children.length; i++) {
    let individual = children[i]
    let odd = Math.random()
    if (odd <= MUTATION_RATE) {
      let index1 = Math.floor(Math.random() * (individual.foods_order.length-1))
      let index2 = Math.floor(Math.random() * (individual.foods_order.length-1))
      let aux = individual.foods_order[index1]
      individual.foods_order[index1] = individual.foods_order[index2]
      individual.foods_order[index2] = aux
    }
  }
  return children
}



const nextGeneration = (population) => {
  // Get the fitness for each individual in the population
  for (let i = 0; i < population.length; i++) {
    // Get the individual
    let individual = population[i]
    individual.fitness = fitness(individual)
  }

  // console.log("START:", population, "\n\n")

  // Sort the population by fitness
  let sorted_population = sortPopulation(population)
  // console.log("SORTED:")
  // printIndividualsAndManhattan(parents)
  // console.log("\n\n")

  // Select the parents
  let parents = selection(sorted_population)
  // console.log("PARENTS:")
  // printIndividualsAndManhattan(parents)
  // console.log("\n\n")

  
  // Crossover the population
  let children = crossover(parents)
  // console.log("CHILDREN:")
  // printIndividualsAndManhattan(children)
  // console.log("\n\n")

  // Mutate the population
  population = mutation(children)
  // console.log("MUTATION:")
  // printIndividualsAndManhattan(children)
  // console.log("\n\n")

  return population
}



export const executeGeneticAlgorithm = (data, snake, foods) => {
  console.log("STARTING GENETIC ALGORITHM")
  console.log("snakeHead: ", snake, "\nfoodCoords: ", foods)
  setDefaultValues(data, snake, foods)

  if (GAME_MATRIX == null || SNAKE == null || FOODS == null) {
    console.log('GAME_MATRIX or SNAKE or FOODS is null')
    return
  }

  // // Initialize a population of random individuals with random moves
  let population = []
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let foods = generateRandomPath(FOODS)
    population.push(new Individual(foods))
  }
    
  // Evolve the population over multiple generations
  for (let i = 0; i < MAX_GENERATIONS; i++) {
    population = nextGeneration(population)
  }

  for (let i = 0; i < population.length; i++) {
    // Get the individual
    let individual = population[i]
    individual.fitness = fitness(individual)
  }
  population = sortPopulation(population)

  console.log("FINAL RESULT:")
  printIndividualsAndManhattan(population, 1, false)

  return population[0]
}
