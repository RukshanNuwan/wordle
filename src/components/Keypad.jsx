import {useEffect, useState} from "react";
import {BsArrowLeft, BsArrowReturnLeft} from "react-icons/bs";

import Axios from '../api/axios';

const Keypad = ({usedKeys}) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await Axios.get('/letters');
        setLetters(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div className="keypad">
      {letters && letters.map((letter, index) => {
        const color = usedKeys[letter.key];

        return (
          <div key={index} className={(letter.key === 'ENTER' || letter.key === 'BACKSPACE') ? 'btn-action' : color}>
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
