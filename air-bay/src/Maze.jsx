import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Maze.css';

const gridSize = 10;
const word = "BREATH";

// Manually place the letters
const letterPositions = [
    { letter: 'B', x: 1, y: 2 },
    { letter: 'R', x: 3, y: 4 },
    { letter: 'E', x: 2, y: 6 },
    { letter: 'A', x: 5, y: 1 },
    { letter: 'T', x: 7, y: 3 },
    { letter: 'H', x: 8, y: 7 },
    { letter: 'S', x: 6, y: 6 },
    { letter: 'W', x: 4, y: 3 },
    { letter: 'M', x: 1, y: 9 },
    { letter: 'P', x: 5, y: 9 },
    { letter: 'L', x: 9, y: 3 },
    { letter: 'Y', x: 7, y: 6 },
    { letter: 'K', x: 2, y: 5 },
    { letter: 'D', x: 8, y: 3 }
];

// Fixed grid layout
const fixedGrid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(true));

const Maze = () => {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
    const [revealedLetters, setRevealedLetters] = useState({});
    const [isExit, setIsExit] = useState(false);

    useEffect(() => {
        if (playerPos.x === gridSize - 1 && playerPos.y === gridSize - 1) {
            setIsExit(true);
        } else {
            setIsExit(false);
        }

        // Reveal letters when player steps on the right square
        letterPositions.forEach((letter) => {
            if (letter.x === playerPos.x && letter.y === playerPos.y) {
                setRevealedLetters((prev) => ({ ...prev, [`${letter.x}-${letter.y}`]: letter.letter }));
            }
        });
    }, [playerPos]);

    const movePlayer = (dx, dy) => {
        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
            setPlayerPos({ x: newX, y: newY });
        }
    };

    const handleReset = () => {
        setPlayerPos({ x: 0, y: 0 });
        setIsExit(false);
        setRevealedLetters({});
    };

    return (
        <div className="maze-container">
            <div className="maze-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '5px' }}>
                {fixedGrid.map((row, i) =>
                    row.map((cell, j) => {
                        const isPlayer = playerPos.x === i && playerPos.y === j;
                        const letterKey = `${i}-${j}`;
                        const letter = revealedLetters[letterKey] || '';
                        const hiddenLetter = letterPositions.find(l => l.x === i && l.y === j)?.letter || '';

                        return (
                            <motion.div
                                key={`${i}-${j}`}
                                className={`cell ${isPlayer ? 'player' : ''}`}
                                animate={{ scale: isExit ? 1.2 : 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ border: '1px solid #ccc', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                {hiddenLetter || '.'}
                            </motion.div>
                        );
                    })
                )}
            </div>
            <div className="controls">
                <button onClick={() => movePlayer(0, -1)}>Left</button>
                <button onClick={() => movePlayer(0, 1)}>Right</button>
                <button onClick={() => movePlayer(-1, 0)}>Up</button>
                <button onClick={() => movePlayer(1, 0)}>Down</button>
            </div>
            {isExit && <div className="win-message">You found the exit!</div>}
        </div>
    );
};

export default Maze;
