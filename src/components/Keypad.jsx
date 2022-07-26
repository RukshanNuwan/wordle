import {useEffect, useState} from "react";
import {BsArrowLeft, BsArrowReturnLeft} from "react-icons/bs";

const Keypad = () => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    // TODO: Add axios to fetch the data instead of fetch api
    fetch('http://localhost:3001/letters')
      .then(response => response.json())
      .then(data => setLetters(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="keypad">
      {letters && letters.map((letter, index) => {
        return (
          <div key={index} className={(letter.key === 'ENTER' || letter.key === 'BACKSPACE') && 'btn-action'}>
            {letter.key === 'ENTER'
              ? <BsArrowReturnLeft/>
              : letter.key === 'BACKSPACE'
                ? <BsArrowLeft/>
                : letter.key}
          </div>
        );
      })}
    </div>
  );
};

export default Keypad;
