import React, { useState, useEffect } from 'react';
import Square from '../Square';
import './SubBoard.css';

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

const SubBoard = ({ subBoardIndex, subBoardState, onClick, isActive = false }) => {
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const subBoardWinner = calculateWinner(subBoardState);
        setWinner(subBoardWinner);
    }, [subBoardState]);

    return (
        // Add the 'active' class if isActive is true.
        <div className={`subBoard ${isActive ? 'active' : ''}`}>
            <div className="lineHorizontal"></div>
            <div className="lineHorizontal"></div>
            <div className="lineVertical"></div>
            <div className="lineVertical"></div>
            {subBoardState.map((square, i) => (
                <Square key={i} value={square} onClick={() => !winner && onClick(subBoardIndex, i)} />
            ))}
            {winner && (
                <div className='winnerOverlay'>{winner}</div>
            )}
        </div>
    );
}

export default SubBoard;