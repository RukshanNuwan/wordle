import {useEffect} from 'react';

import useWordle from "../hooks/useWordle";

const Wordle = ({solution}) => {
  const {currentGuess, guesses, isCorrect, turn, handleKeyUp} = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
    </div>
  );
};

export default Wordle;
