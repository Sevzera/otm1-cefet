export class Individual {
  fitness = 0
  mapped_fitness = 0
  foods_order = []

  constructor(foods) {
    this.foods_order = foods
  }
}