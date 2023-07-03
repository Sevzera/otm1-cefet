from snake import Snake

HIGH_COST = 1000
FOODS_IN_GAME = 3

def main():
    snake = Snake(number_of_foods=FOODS_IN_GAME)
    costs = snake.get_cost_matrix()
    
    # create json file
    file = open("model.json", "w")
    file.write('{\n')
    # recovering all costs between different cities
    C = []
    for routes in costs:
        for route in routes:
            if route != 9999:
                C.append(route)
    
    # completing with 2*n artificial variables
    for i in range(2*len(costs)):
        C.append(HIGH_COST)
    
    file.write("    \"C\": [\n")
    for i in range(len(C)):
        if i == len(C)-1:
            file.write("        {}\n".format(C[i]))
        else:
            file.write("        {},\n".format(C[i]))
    file.write("    ],\n")

    A = []
    for variables in range(2*len(costs)):
        # row restrictions
        change_rule = len(costs)
        row_base = [0]*FOODS_IN_GAME*len(costs)
        row_non_base = [0]*2*len(costs)
        for food in range(FOODS_IN_GAME):
            if change_rule > variables: 
                row_base[food + (variables*FOODS_IN_GAME)] = 1

            for row in range(2*len(costs)):
                if variables == row:
                    row_non_base[row] = 1
                else:
                    row_non_base[row] = 0
        A.append(row_base+row_non_base)

    matrix = []

    sub_matrix = []
    zeros = [0]*FOODS_IN_GAME
    z_ref = 0
    for pos in range(len(costs)):
        matrix.append([])
        id_ref = 0
        for row in range(len(costs)-1):
            line = [0] * FOODS_IN_GAME
            if id_ref == row:
                line[id_ref] = 1
                id_ref += 1
            if z_ref == row:
                sub_matrix.append(zeros)
            sub_matrix.append(line)
        z_ref+=1
    sub_matrix.append(zeros)

    abs = 0
    for line in range(len(costs)):
        for row in range(len(costs)):
            matrix[row] += sub_matrix[abs]
            abs += 1

    for r in range(len(costs)):
        for c in range(FOODS_IN_GAME*len(costs)):
            A[r+len(costs)][c] = matrix[r][c]

    file.write("    \"A\": [\n")
    for i in range(len(A)):
        if i == len(A) - 1:
            file.write("        {}\n".format(A[i]))
        else:
            file.write("        {},\n".format(A[i]))
    file.write("    ],\n")
    
if __name__== "__main__":
    main()