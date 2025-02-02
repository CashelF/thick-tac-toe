import React, { useState, useEffect } from 'react';
import SuperBoard from './SuperBoard/SuperBoard';

function calculateWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

const Game = () => {
    // Dynamically set the size of the game container based on the viewport size
    const [gameContainerStyle, setGameContainerStyle] = useState(styles.gameContainer);

    useEffect(() => {
        const updateGameContainerSize = () => {
            const vh = window.innerHeight * 0.01;
            const vw = window.innerWidth * 0.01;
            const smallerDimension = Math.min(vh, vw);

            setGameContainerStyle({
                ...styles.gameContainer,
                width: `${80 * smallerDimension}px`,
                height: `${80 * smallerDimension}px`
            });
        };

        window.addEventListener('resize', updateGameContainerSize);
        updateGameContainerSize(); // Call on initial load

        return () => window.removeEventListener('resize', updateGameContainerSize);
    }, []);

    // Initialize state – try to load from localStorage first.
    const [superBoardState, setSuperBoardState] = useState(() => {
        const saved = localStorage.getItem('thickTacToeState');
        if (saved) {
            const { superBoardState } = JSON.parse(saved);
            return superBoardState;
        }
        return Array(9).fill(null).map(() => Array(9).fill(null));
    });
    const [currentPlayer, setCurrentPlayer] = useState(() => {
        const saved = localStorage.getItem('thickTacToeState');
        if (saved) {
            const { currentPlayer } = JSON.parse(saved);
            return currentPlayer;
        }
        return 'X';
    });
    const [requiredSubBoard, setRequiredSubBoard] = useState(() => {
        const saved = localStorage.getItem('thickTacToeState');
        if (saved) {
            const { requiredSubBoard } = JSON.parse(saved);
            return requiredSubBoard;
        }
        return null;
    });

    // Save game state whenever it changes.
    useEffect(() => {
        const gameState = {
            superBoardState,
            currentPlayer,
            requiredSubBoard,
        };
        localStorage.setItem('thickTacToeState', JSON.stringify(gameState));
    }, [superBoardState, currentPlayer, requiredSubBoard]);

    const handleSubBoardClick = (subBoardIndex, squareIndex) => {
        const newSubBoard = [...superBoardState[subBoardIndex]];

        if (requiredSubBoard != null && requiredSubBoard !== subBoardIndex) {
            return;
        }
        if (newSubBoard[squareIndex]) {
            return;
        }

        // Update the square with the current player's symbol
        newSubBoard[squareIndex] = currentPlayer;

        // Create a new copy of the superBoardState with the updated subBoard
        const newSuperBoardState = superBoardState.map((subBoard, index) => 
            index === subBoardIndex ? newSubBoard : subBoard
        );

        setSuperBoardState(newSuperBoardState);
        
        // Set new required subBoard based on the square index that was just played.
        // If that subBoard is already won, then allow any subBoard (null).
        const nextRequired = calculateWinner(newSuperBoardState[squareIndex]) ? null : squareIndex;
        setRequiredSubBoard(nextRequired);

        // Switch players
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <div style={gameContainerStyle}>
            <SuperBoard 
                superBoardState={superBoardState} 
                onSubBoardClick={handleSubBoardClick} 
                requiredSubBoard={requiredSubBoard}  // Pass down the active subboard
            />
        </div>
    );
}

export default Game;

const styles = {
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'auto',
    }
};
