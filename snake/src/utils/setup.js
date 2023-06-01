const setup = {};

setup.init = (i, j) => {
  const board = [];
  for (let n = 0; n < i; n++) {
    const row = [];
    for (let m = 0; m < j; m++) {
      row.push({
        snakehead: false,
        food: false,
      });
    }
    board.push(row);
  }

  const row = Math.floor(Math.random() * i);
  const col = Math.floor(Math.random() * j);
  board[row][col].snakehead = true;

  for (let n = 0; n < 5; n++) {
    const row = Math.floor(Math.random() * i);
    const col = Math.floor(Math.random() * j);
    if (!board[row][col].snakehead) board[row][col].food = true;
    else n--;
  }

  return board;
};

export default setup;
