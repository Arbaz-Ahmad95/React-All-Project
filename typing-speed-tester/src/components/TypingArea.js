import React from 'react';

const TypingArea = ({
  typingText,
  inpFieldValue,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  initTyping,
  resetGame,
  charIndex,
}) => {
  return (
    <div className="section">
      <div className="section1">
        <p id="paragraph">
          {typingText.split('').map((char, index) => {
            let className = '';
            if (index < charIndex) {
              className = char === inpFieldValue[index] ? 'correct' : 'incorrect';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </p>
      </div>
      <input
        type="text"
        className="input-field"
        value={inpFieldValue}
        onChange={initTyping}
        placeholder="Start typing here..."
        autoFocus
      />
      <div className="section2">
        <ul className="resultDetails">
          <li className="time">
            <p>Time Left:</p>
            <span>
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="mistake">
            <p>Mistakes:</p>
            <span>{mistakes}</span>
          </li>
          <li className="wpm">
            <p>WPM:</p>
            <span>{WPM}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{CPM}</span>
          </li>
        </ul>
        <button onClick={resetGame} className="btn">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TypingArea;
