import React, {useState, useEffect} from 'react';
import Square from '../Square';
import './SubBoard.css';

function calculateWinner(board) { // TODO: move this function to a separate file
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

const SubBoard = ({ subBoardIndex, subBoardState, onClick }) => {
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const subBoardWinner = calculateWinner(subBoardState);
        if (subBoardWinner) {
            setWinner(subBoardWinner);
        }
    }, [subBoardState]);

    return (
        <div className='subBoard'>
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


// const styles = {
//     subBoard: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(3, 1fr)',
//         gridTemplateRows: 'repeat(3, 1fr)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '90%',
//         height: '90%',
//         margin: '5%',
//         position: 'relative',
//         border: '1px solid black',
//         borderRadius: '5px',
//         backgroundColor: 'white',
        
//         '&::before, &::after': {
//             content: '""',
//             position: 'absolute',
//             backgroundColor: '#000', // Line color
//         },
//         '&::before': {
//             top: '33%',
//             left: 0,
//             right: 0,
//             height: '3px', // Line thickness
//         },
//         '&::after': {
//             top: '66%',
//             left: 0,
//             right: 0,
//             height: '3px',
//         }
//     },
//     winnerOverlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0, 
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         fontSize: '25vw',
//         fontWeight: 'bold',
//         color: 'white',
//         overflow: 'hidden',
//     }, // TODO: separate the winner overlay with the text so the letter can be better centered
// }