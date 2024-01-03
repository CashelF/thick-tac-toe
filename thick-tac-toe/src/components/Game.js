import React, { useState } from 'react';
import SuperBoard from './SuperBoard';

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
    const [superBoardState, setSuperBoardState] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [requiredSubBoard, setRequiredSubBoard] = useState(null);

    const handleSubBoardClick = (subBoardIndex, squareIndex) => {
        const newSubBoard = [...superBoardState[subBoardIndex]];

        if(requiredSubBoard && requiredSubBoard !== subBoardIndex) {
            return;
        }
        if (newSubBoard[squareIndex]) {
            return;
        }

        // Update the square with the current player's symbol
        newSubBoard[squareIndex] = currentPlayer;
        setRequiredSubBoard(squareIndex);

        // Create a new copy of the superBoardState with the updated subBoard
        const newSuperBoardState = superBoardState.map((subBoard, index) => 
        index === subBoardIndex ? newSubBoard : subBoard
        );

        setSuperBoardState(newSuperBoardState);

        // Switch players
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <div style={styles.gameContainer}>
            <SuperBoard superBoardState={superBoardState} onSubBoardClick={handleSubBoardClick} />
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


