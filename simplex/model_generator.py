from snake import Snake
import argparse

ap = argparse.ArgumentParser()
ap.add_argument("-p", "--foods", required=True,
	help="path to model json file")
args = vars(ap.parse_args())

HIGH_COST = 1000
FOODS_IN_GAME = int(args["foods"])

def main():
    snake = Snake(number_of_foods=FOODS_IN_GAME)
    costs = snake.get_cost_matrix()
    
    # recovering all costs between different cities
    C = []
    for routes in costs:
        for route in routes:
            if route != 9999:
                C.append(route)
    
    # completing with 2*n artificial variables
    for i in range(2*len(costs)):
        C.append(HIGH_COST)

    # finding A, B and N matrices
    A = []
    B = []
    N = []
    for variables in range(2*len(costs)):
        # row restrictions
        change_rule = len(costs)
        non_base_row = [0]*FOODS_IN_GAME*len(costs)
        base_row = [0]*2*len(costs)
        for food in range(FOODS_IN_GAME):
            if change_rule > variables: 
                non_base_row[food + (variables*FOODS_IN_GAME)] = 1

            for row in range(2*len(costs)):
                if variables == row:
                    base_row[row] = 1
                else:
                    base_row[row] = 0
        N.append(non_base_row)
        B.append(base_row)
        A.append(non_base_row+base_row)

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
            N[r+len(costs)][c] = matrix[r][c]

    # finding b list
    b = []
    for i in range(2*len(costs)):
        b.append(1)

    # save model
    file = open("model.json", "w")
    file.write('{\n')

    file.write("    \"C\": [\n")
    for i in range(len(C)):
        if i == len(C)-1:
            file.write("        {}\n".format(C[i]))
        else:
            file.write("        {},\n".format(C[i]))
    file.write("    ],\n")

    file.write("    \"A\": [\n")
    for i in range(len(A)):
        if i == len(A) - 1:
            file.write("        {}\n".format(A[i]))
        else:
            file.write("        {},\n".format(A[i]))
    file.write("    ],\n")

    file.write("    \"B\": [\n")
    for i in range(len(B)):
        if i == len(B) - 1:
            file.write("        {}\n".format(B[i]))
        else:
            file.write("        {},\n".format(B[i]))
    file.write("    ],\n")

    file.write("    \"N\": [\n")
    for i in range(len(N)):
        if i == len(N) - 1:
            file.write("        {}\n".format(N[i]))
        else:
            file.write("        {},\n".format(N[i]))
    file.write("    ],\n")

    file.write("    \"b\": [")
    for i in range(len(b)):
        if i == len(b) - 1:
            file.write("{}".format(b[i]))
        else:
            file.write("{},".format(b[i]))
    file.write("]\n}")

    file.close()

if __name__== "__main__":
    main()