To build a genetic algorithm for your snake game, you’ll need to define a few things:

1. A representation for the individuals in the population (e.g. a string of bits or a list of numbers).
2. A fitness function that evaluates how well an individual solves the problem (e.g. how long the snake survives or how many points it scores).
3. A selection method for choosing parents to reproduce (e.g. tournament selection or roulette wheel selection).
4. Crossover and mutation operators for combining and modifying the traits of parents to create offspring.

Once you have these components defined, you can initialize a population of random individuals and then iteratively apply selection, crossover, and mutation to evolve the population over time. The fittest individuals in each generation can be used as the basis for creating the next generation.

Levando em consideracao as informacoes anterioes, uma ideia e:

1. "cobras" que irao andar de forma a simular o jogo com os movimentos de (up = 0, down = 1, left = 2, right = 3)
2. Tem que levar em consideracao o numero de macas comidas pela cobra e o caminho, focando este caminho para o minimo de passos e, desta forma, obtendo o score
3. O metodo de selecao, a principio, pega os 50% melhores individuos da populacao
4. O crossover pega une parte dos movimentos que as cobras fizeram, a mutacao altera o movimento