import numpy as np

class Snake:
    def __init__(self, number_of_foods=50):
        self.snake_start_position = [[25,25]]
        self.number_of_foods = number_of_foods
        self.foods = [
            [13, 47], [29, 2] , [6, 34] , [41, 19], [8, 11] , 
            [14, 23], [36, 45], [9, 7]  , [28, 33], [17, 39],
            [3, 18] , [41, 4] , [26, 11], [35, 25], [48, 32],
            [21, 13], [37, 22], [10, 46], [44, 1] , [15, 29],
            [2, 38] , [40, 16], [24, 5] , [8, 31] , [49, 20],
            [7, 42] , [19, 16], [33, 28], [25, 6] , [12, 35],
            [30, 23], [1, 44] , [46, 11], [21, 39], [14, 17],
            [48, 32], [5, 20] , [36, 8] , [9, 25] , [40, 13],
            [24, 37], [3, 46] , [29, 4] , [17, 22], [43, 30],
            [8, 15] , [26, 41], [38, 19], [11, 33], [31, 2] ,
        ]
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
    
