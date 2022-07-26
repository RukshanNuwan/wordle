import {useEffect} from 'react';

import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

const Wordle = ({solution}) => {
  const {currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyUp} = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

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
