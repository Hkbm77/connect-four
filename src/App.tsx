import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);

  const [gameover, setGameover] = useState(false);
  const [winner, setWinner] = useState("");

  const handleClick = (e: any) => {
    if (gameover) return;
    const row = e.target.dataset.rowindex;
    const column = board[row].lastIndexOf("");

    if (column < 0) {
      alert("Please select different column");
      return;
    }

    setBoard((prev: any) => {
      const board = [...prev];
      board[row][column] = player;
      return board;
    });

    setPlayer((player) => (player === "X" ? "O" : "X"));
  };

  const checkWinner = () => {
    // case1 - vertical win check
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= 6 - 4; j++) {
        if (
          board[i][j] !== "" &&
          board[i][j] === board[i][j + 1] &&
          board[i][j + 1] === board[i][j + 2] &&
          board[i][j + 2] === board[i][j + 3]
        ) {
          setGameover(true);
          return;
        }
      }
    }

    //case2 - horizontal win check
    for (let i = 0; i <= 7 - 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (
          board[i][j] !== "" &&
          board[i][j] === board[i + 1][j] &&
          board[i + 1][j] === board[i + 2][j] &&
          board[i + 2][j] === board[i + 3][j]
        ) {
          setGameover(true);
          return;
        }
      }
    }

    //case3 - diagonal check top to bottom
    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 0; j < 6 - 3; j++) {
        debugger;
        if (
          board[i][j] !== "" &&
          board[i][j] === board[i + 1][j + 1] &&
          board[i + 1][j + 1] === board[i + 2][j + 2] &&
          board[i + 2][j + 2] === board[i + 3][j + 3]
        ) {
          setGameover(true);
          return;
        }
      }
    }

    //case4 - bottom to top

    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 5; j >= 3; j--) {
        if (
          board[i][j] !== "" &&
          board[i][j] === board[i + 1][j - 1] &&
          board[i + 1][j - 1] === board[i + 2][j - 2] &&
          board[i + 2][j - 2] === board[i + 3][j - 3]
        ) {
          setGameover(true);
          return;
        }
      }
    }
  };

  const resetBoard = (e: any) => {
    e.preventDefault();
    setBoard([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);
    setGameover(false);
    setPlayer("X");
    setWinner("");
  };

  useEffect(() => {
    gameover && setWinner(player === "X" ? "O" : "X");
  }, [gameover]);
  useEffect(() => {
    checkWinner();
  }, [board]);
  return (
    <>
      <h1>PlayConnect 4 </h1>
      {gameover && (
        <>
          <h2 className={winner === "X" ? "red" : "yellow"}>
            {" "}
            {`${winner === "X" ? "Red" : "Yellow"} won the game`}
          </h2>
          <button onClick={resetBoard}>Start New Game</button>
        </>
      )}

      {!gameover && (
        <h2 className={player === "X" ? "red" : "yellow"}>{`${
          player === "X" ? "Red" : "Yellow"
        } turn`}</h2>
      )}
      <div className="board" onClick={handleClick}>
        {board.map((row, rowIndex) => (
          <ul key={rowIndex} className="column">
            {row.map((column, columnIndex) => (
              <li
                className={!!column ? (column === "X" ? "red" : "yellow") : ""}
                data-rowindex={rowIndex}
                key={columnIndex}
              ></li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
