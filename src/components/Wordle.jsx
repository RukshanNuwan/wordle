import {useEffect} from 'react';

import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

const Wordle = ({solution}) => {
  const {currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyUp} = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      console.log('You win!');
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (turn > 5) {
      console.log('Unfortunately, Out of guesses');
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  return (
    <div>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>

      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
      />

      <Keypad usedKeys={usedKeys}/>
    </div>
  );
};

export default Wordle;
