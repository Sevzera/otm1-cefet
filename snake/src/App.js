import React from "react";
import { setup } from "./utils";

const maxRows = 10;
const maxCols = 10;

const App = () => {
  const [game, setGame] = React.useState(setup.init(maxRows, maxCols));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGame(setup.init(maxRows, maxCols));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen">
      {game.map((row, i) => {
        return (
          <div key={i} className="flex flex-row">
            {row.map((col, j) => {
              const isSnakeHead = game[i][j].snakehead;
              const isFood = game[i][j].food;
              return (
                <div
                  key={j}
                  className={`w-10 h-10 border border-gray-500 ${
                    isSnakeHead && "bg-black"
                  } ${isFood && "bg-green-500"}`}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
