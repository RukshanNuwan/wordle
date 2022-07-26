import {useState} from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map(letter => {
      return {key: letter, color: 'grey'};
    });

    // Find any green letters in the solution
    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key.toUpperCase()) {
        formattedGuess[index].color = 'green';
        solutionArray[index] = null;
      }
    });

    // Find any yellow letters in the solution
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key.toUpperCase()) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toUpperCase() === solution) setIsCorrect(true);

    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory(prevHistory => [...prevHistory, currentGuess]);
    setTurn(prevTurn => prevTurn + 1);
    setUsedKeys(prevUsedKeys => {
      let newKeys = {...prevUsedKeys};

      formattedGuess.forEach(letter => {
        const currentColor = newKeys[letter.key];

        if (letter.color === 'green') {
          newKeys[letter.key] = 'green';
          return;
        }

        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow';
          return;
        }

        if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[letter.key] = 'grey';
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess('');
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

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
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

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp};
};

export default useWordle;
