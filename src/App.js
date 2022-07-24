import {useEffect, useState} from "react";

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
      })
      .catch(error => console.error(error));
  }, [setSolution]);

  return (
    <div>
      <h1>Wordle</h1>

      {solution && (
        <div>Solution is: {solution}</div>
      )}
    </div>
  );
};

export default App;
