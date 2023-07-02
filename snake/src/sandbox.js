const generateRandomFoodsArray = (boardSize, foodsNumber, snakeOrigin) => {
  const foodsArray = [];
  for (let i = 0; i < foodsNumber; i++) {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    if (
      (x === snakeOrigin[0] && y === snakeOrigin[1]) ||
      foodsArray.includes([x, y])
    ) {
      i--;
      continue;
    }
    foodsArray.push([x, y]);
  }
  return foodsArray;
};

const randomFoodsArray = generateRandomFoodsArray(50, 150, [25, 25]);

return console.log(JSON.stringify(randomFoodsArray));
