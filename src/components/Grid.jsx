import Row from "./Row";

const Grid = ({currentGuess, guesses, turn}) => {
  return (
    <div>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess}/>
      ))}
    </div>
  );
};

export default Grid;
