const Modal = ({isCorrect, turn, solution}) => {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>You Win!</h1>
          <p>You found the solution in {turn} guesses 😍</p>
        </div>
      ) : (
        <div>
          <h1>Never Mind</h1>
          <p className="solution">Word is : {solution}</p>
          <p>Better look next time 🙂</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
