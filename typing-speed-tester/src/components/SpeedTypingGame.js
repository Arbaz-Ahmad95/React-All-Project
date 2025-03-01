import React, { useState, useEffect } from 'react';
import './SpeedTypingGame.css';
import TypingArea from './TypingArea';

const SpeedTypingGame = () => {
    const paragraphs = [
        "A plant is one of the most important living things that develop on the earth...",
        "The root is the part of the plant that grows in the soil...",
        "Stem is the posterior part that remains above the ground...",
        "It is the blossom of a plant...",
        "An aunt is a bassoon from the right perspective..."
    ];

    const [typingText, setTypingText] = useState('');
    const [inpFieldValue, setInpFieldValue] = useState('');
    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);

    const loadParagraph = () => {
        const ranIndex = Math.floor(Math.random() * paragraphs.length);
        setTypingText(paragraphs[ranIndex]);
        setInpFieldValue('');
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
        setWPM(0);
        setCPM(0);
        setTimeLeft(maxTime);
    };

    const initTyping = (event) => {
        if (timeLeft <= 0) return;

        const typedChar = event.target.value;
        setInpFieldValue(typedChar);

        if (!isTyping) {
            setIsTyping(true);
        }

        if (charIndex < typingText.length) {
            if (typedChar[typedChar.length - 1] === typingText[charIndex]) {
                setCharIndex(charIndex + 1);
            } else {
                setMistakes(mistakes + 1);
            }

            let wpm = Math.round(((charIndex / 5) / ((maxTime - timeLeft) / 60)));
            setWPM(wpm < 0 || isNaN(wpm) ? 0 : wpm);

            let cpm = charIndex * (60 / (maxTime - timeLeft));
            setCPM(cpm < 0 || isNaN(cpm) ? 0 : parseInt(cpm, 10));
        }
    };

    const resetGame = () => {
        loadParagraph();
    };

    useEffect(() => {
        loadParagraph();
    }, []);

    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setIsTyping(false);
        }
        return () => clearInterval(interval);
    }, [isTyping, timeLeft]);

    return (
        <div className="container">
            <TypingArea
                typingText={typingText}
                inpFieldValue={inpFieldValue}
                timeLeft={timeLeft}
                mistakes={mistakes}
                WPM={WPM}
                CPM={CPM}
                resetGame={resetGame}
                initTyping={initTyping}
                charIndex={charIndex}
            />
        </div>
    );
};

export default SpeedTypingGame;
