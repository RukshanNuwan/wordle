import {useEffect, useState} from 'react';

import Wordle from './components/Wordle';
import axios from "axios";

const App = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://wordle-answers-solutions.p.rapidapi.com/answers';

      try {
        const response = await axios.get(url, {
          headers: {
            'X-RapidAPI-Key': '074d2f3ae3mshbd5c04c0b4aa281p189a38jsn0051b16565cd',
            'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
          }
        });

        const data = response.data.data;
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.answer);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setSolution]);

  return (
    <div>
      <h1>Wordle Game</h1>

      {solution && <Wordle solution={solution}/>}
    </div>
  );
};

export default App;

// © 2022 shanwijendra.dev
