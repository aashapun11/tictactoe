import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WinnerState } from "./assets/WinnerContext";
import useSound from 'use-sound';
import clickSound from './assets/sounds/click.mp3';
import winSound from './assets/sounds/win.mp3';
import tieSound from './assets/sounds/tie.mp3';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winningLine, setWinningLine] = useState([]);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);
  const navigate = useNavigate();
  const { winner, setWinner, isTie, setIsTie } = WinnerState();
  const [playClickSound] = useSound(clickSound);
  const [playWinSound] = useSound(winSound);
  const [playTieSound] = useSound(tieSound);

  const [isXNext, setIsXNext] = useState(true);
  const [isComputer, setIsComputer] = useState(false); // Computer's turn state

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWinner = () => {
   
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(winLines[i]);
        setIsBoardDisabled(true);
        setTimeout(() => {
          navigate("/winner");
          playWinSound();
        }, 1000);
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setIsTie(true);
      setTimeout(() => {
        navigate("/winner");
        playTieSound();
      }, 1000);
    }
  };

  const handleClick = (index) => {
    if (board[index] !== null || isBoardDisabled || isComputer) return;
    playClickSound();

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setIsComputer(true); // Switch to computer's turn
  };

  const computerMove = () => {
    if (!isComputer || winner) return;
    playClickSound();
  
    const getWinningMove = (symbol) => {
      for (const [a, b, c] of winLines) {
        if (board[a] === symbol && board[b] === symbol && !board[c]) return c;
        if (board[a] === symbol && board[c] === symbol && !board[b]) return b;
        if (board[b] === symbol && board[c] === symbol && !board[a]) return a;
      }
      return null;
    };
  
    // 1. Check if the computer can win
    let move = getWinningMove("O");
    if (move !== null) {
      makeMove(move, "O");
      return;
    }
  
    // 2. Check if the computer needs to block the player
    move = getWinningMove("X");
    if (move !== null) {
      makeMove(move, "O");
      return;
    }
  
    // 3. Take the center if available
    if (board[4] === null) {
      makeMove(4, "O");
      return;
    }
  
    // 4. Take any available corner
    const corners = [0, 2, 6, 8];
    move = corners.find((corner) => board[corner] === null);
    if (move !== null) {
      makeMove(move, "O");
      return;
    }
  
    // 5. Take any remaining space
    move = board.findIndex((cell) => cell === null);
    if (move !== -1) {
      makeMove(move, "O");
    }
  };
  
  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setCurrentPlayer("X");
    setIsComputer(false);
  };
  

  useEffect(() => {
    checkWinner();

    if (isComputer) {
      setTimeout(() => {
        computerMove();
      }, 1000); // Add delay for computer's move
    
    }
  }, [board, isComputer]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold text-white mb-8 shadow-lg">
        Tic Tac Toe
      </h1>
      {!winner ? (
        <div className="text-3xl font-bold text-white mb-6 animate-pulse">
          It's{" "}
          <span className="text-blue-700 text-4xl underline">{currentPlayer}</span>{" "}
          turn!
        </div>
      ) : (
        <div></div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex justify-center items-center text-4xl font-bold rounded-lg shadow-lg transition-transform transform ${
              cell ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white hover:scale-110"
            } ${winningLine.includes(index) ? "ring-4 ring-yellow-400" : ""}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
