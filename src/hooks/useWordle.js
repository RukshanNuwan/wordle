import {useState} from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map(letter => {
      return {key: letter, color: 'grey'};
    });

    // Find any green letters in the solution
    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = 'green';
        solutionArray[index] = null;
      }
    });

    // Find any red letters in the solution
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) setIsCorrect(true);

    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory(prevHistory => [...prevHistory, currentGuess]);
    setTurn(prevTurn => prevTurn + 1);
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

  return {turn, currentGuess, guesses, isCorrect, handleKeyUp};
};

export default useWordle;
