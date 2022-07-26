import {useEffect, useState} from 'react';

import Wordle from './components/Wordle';

// TODO: Add an API instead of json file

const App = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    // TODO: Add axios to fetch the data instead of fetch api
    fetch('http://localhost:3001/solutions')
      .then(response => response.json())
      .then(data => {
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <div>
      <h1>Wordle Game</h1>

      {solution && <Wordle solution={solution}/>}
    </div>
  );
};

export default App;
