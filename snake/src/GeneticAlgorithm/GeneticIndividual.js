export class Individual {
  fitness = 0
  mapped_fitness = 0
  foods_eaten = 0
  moves = []

  constructor(moves) {
    this.moves = moves
  }
}