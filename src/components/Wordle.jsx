import {useEffect} from 'react';

import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

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

      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
      />

      <Keypad/>
    </div>
  );
};

export default Wordle;
