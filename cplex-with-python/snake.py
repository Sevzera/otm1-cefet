import numpy as np
from data import Data
class Snake:
    def __init__(self, number_of_foods=300):
        self.snake_start_position = [[50,50]]
        self.number_of_foods = number_of_foods
        self.foods = Data().ARRAY_OF_FOODS_100x100
        self.cost_matrix = []

    def manhattan_distance(self, x1, y1, x2, y2):
        return abs(x1-x2) + abs(y1-y2)
    
    def get_cost_matrix(self):
        matrix = np.concatenate((self.snake_start_position, self.foods[ :self.number_of_foods ]), axis=0)
        cost_matrix = []
        for i in range(len(matrix)):
            aux = []
            for j in range(len(matrix)):
                if i == j:
                    aux.append(9999)
                else: 
                    aux.append(self.manhattan_distance(matrix[i][0], matrix[i][1], matrix[j][0], matrix[j][1]))
            cost_matrix.append(aux)
        self.cost_matrix = cost_matrix
        return cost_matrix

    def print_foods(self):
        print(self.foods[:self.number_of_foods])

    def print_nodes_from_graph(self):
        aux = np.concatenate((self.snake_start_position, self.foods[ :self.number_of_foods ]), axis=0)
        print(aux)

    def print_cost_matrix(self):
        print(self.cost_matrix)
    
