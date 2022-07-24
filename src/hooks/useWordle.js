import {useState} from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    console.log('formatting the guess - ', currentGuess);
  };

  const addNewGuess = () => {
  };

  const handleKeyUp = ({key}) => {
    if (key === 'Enter') {
      // Only add new guess if turn is less than 5
      if (turn > 5) {
        console.log('You have reached the maximum number of guesses');
        return;
      }

      // Do not allow duplicate guesses
      if (history.includes(currentGuess)) {
        console.log('You have already guessed this word');
        return;
      }

      // Check word is 5 characters long
      if (currentGuess.length !== 5) {
        console.log('Word must be 5 characters long');
        return;
      }

      formatGuess();
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => {
        return prev.slice(0, -1);
      });

      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => {
          return prev + key;
        });
      }
    }
  };

  return {turn, currentGuess, guesses, isCorrect, handleKeyUp};
};

export default useWordle;
