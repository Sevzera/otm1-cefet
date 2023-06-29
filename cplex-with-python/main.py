from snake import Snake

def main():
    snake = Snake(number_of_foods=5)
    snake.get_cost_matrix()
    snake.print_nodes_from_graph()
    snake.print_cost_matrix()
  
if __name__== "__main__":
    main()