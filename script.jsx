const { useState, useEffect } = React;

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return null;
}

const KEY_STORAGE = "tic-tac-toe-scores";
const KEY_NAME_X = "tic-tac-toe-name-x";
const KEY_NAME_O = "tic-tac-toe-name-o";

export function Board() {
  const [isXPlayer, setIsXPlayer] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [scores, setScores] = useState(() => {
    const data = sessionStorage.getItem(KEY_STORAGE);
    const res = data
      ? JSON.parse(data)
      : {
          X: 0,
          O: 0,
          draw: 0,
        };
    return res;
  });
  const [nameX, setNameX] = useState(
    () => sessionStorage.getItem(KEY_NAME_X) || "",
  );
  const [nameO, setNameO] = useState(
    () => sessionStorage.getItem(KEY_NAME_O) || "",
  );
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    sessionStorage.setItem(KEY_STORAGE, JSON.stringify(scores));
  }, [scores]);

  const winningLine = calculateWinner(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleSquareClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];

    nextSquares[index] = isXPlayer ? "X" : "O";

    setSquares(nextSquares);
    setIsXPlayer(!isXPlayer);

    const calcRes = calculateWinner(nextSquares);
    if (calcRes) {
      const sign = nextSquares[calcRes[0]];

      setScores((prev) => ({
        ...prev,
        [sign]: prev[sign] + 1,
      }));
    } else if (nextSquares.every((square) => square !== null)) {
      setScores((prev) => ({
        ...prev,
        draw: prev.draw + 1,
      }));
    }
  }

  function resetTheGame() {
    setSquares(Array(9).fill(null));
    setIsXPlayer(true);
  }

  function handleNameSubmit(event) {
    event.preventDefault();
    const firstPlayer = nameX.trim();
    const secondPlayer = nameO.trim();
    if (firstPlayer.length >= 3 && secondPlayer.length >= 3) {
      const readXName = sessionStorage.getItem(KEY_NAME_X);
      const readOName = sessionStorage.getItem(KEY_NAME_O);
      sessionStorage.setItem(KEY_NAME_X, firstPlayer);
      sessionStorage.setItem(KEY_NAME_O, secondPlayer);

      if (readXName !== firstPlayer || readOName !== secondPlayer) {
        setScores({
          X: 0,
          O: 0,
          draw: 0,
        });
      }
      setNameX(firstPlayer);
      setNameO(secondPlayer);
      setModalIsOpen(false);
    } else {
      window.alert("Please enter a correct name (at least 3 characters).");
    }
  }

  return (
    <div className="container">
      {modalIsOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="title"
        >
          <form onSubmit={(e) => handleNameSubmit(e)}>
            <h2 id="title">Player names</h2>
            <div className="player-field">
              <label htmlFor="nameX">Player X</label>
              <input
                id="nameX"
                type="text"
                value={nameX}
                required
                onChange={(e) => setNameX(e.target.value)}
                minLength="3"
                maxLength="10"
              />
            </div>

            <div className="player-field">
              <label htmlFor="nameO">Player O</label>
              <input
                id="nameO"
                type="text"
                value={nameO}
                required
                onChange={(e) => setNameO(e.target.value)}
                minLength="3"
                maxLength="10"
              />
            </div>

            <button id="start-game" type="submit">
              GO!
            </button>
          </form>
        </div>
      )}

      <h1>Tic-Tac-Toe</h1>
      {winner ? (
        <h2>Congratulations to {winner === "X" ? nameX : nameO}!</h2>
      ) : isDraw ? (
        <h2>Draw!</h2>
      ) : (
        <h2>Next - {isXPlayer ? nameX || "X" : nameO || "O"}</h2>
      )}
      <div className="scoreboard">
        <h3>
          {nameX || "X"} wins: {scores.X}
        </h3>
        <h3>
          {nameO || "O"} wins: {scores.O}
        </h3>
        <h3>Draws: {scores.draw}</h3>
      </div>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={
              winningLine && winningLine.includes(index)
                ? "square winning-square"
                : "square"
            }
            aria-label={
              square
                ? `Cell ${index + 1}, ${square}`
                : `Cell ${index + 1}, empty`
            }
            onClick={() => handleSquareClick(index)}
          >
            {!square ? (
              ""
            ) : square === "X" ? (
              <span className="mark mark-x">
                <svg
                  viewBox="0 0 80 80"
                  width="55"
                  height="55"
                  aria-hidden="true"
                >
                  <line
                    x1="18"
                    y1="18"
                    x2="62"
                    y2="62"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="62"
                    y1="18"
                    x2="18"
                    y2="62"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ) : (
              <span className="mark mark-o">
                <svg
                  viewBox="0 0 80 80"
                  width="55"
                  height="55"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                  />
                </svg>
              </span>
            )}
          </button>
        ))}
        {winningLine && (
          <div className="win-line" data-line={winningLine.join("-")} />
        )}
      </div>
      <button id="reset" onClick={resetTheGame}>
        Reset Game
      </button>
    </div>
  );
}
