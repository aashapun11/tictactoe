import React, { useEffect } from 'react'
import { WinnerState } from '../WinnerContext';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import clickSound from '../sounds/click.mp3';

function Winner() {
  const { winner, setWinner, isTie, setIsTie } = WinnerState();
  const navigate = useNavigate();
    const [playClickSound] = useSound(clickSound);
    


  const restartGame = () => {
    playClickSound(); // Play sound on cell click
    setWinner(null); // Reset the winner
    setIsTie(false);
    navigate('/');
  }

  useEffect(() => {
    // If winner or tie state is not available, redirect to home page
    if (!winner && !isTie) {
      navigate('/');
    }
  }, [winner, isTie, navigate]);

  
  
  return (
    <>
    
       <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300">
       <div className="p-6 bg-white rounded-lg shadow-xl text-center">
       {isTie ?(  
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-6 animate-bounce">
        It's a Tie <span>🤝</span>
      </h1>
         ):(
         
         <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-6 animate-bounce">
         {winner} won the Game <span>🎉</span>
       </h1>
             )}

         <button
           className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
           onClick={restartGame}
         >
           Restart Game
         </button>
       </div>
     </div>
   
  </>
  );
}

export default Winner