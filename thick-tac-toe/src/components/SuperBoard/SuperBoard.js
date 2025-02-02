import React from 'react';
import SubBoard from '../SubBoard/SubBoard';
import './SuperBoard.css';

const SuperBoard = ({ superBoardState, onSubBoardClick, requiredSubBoard }) => {
    return (
        <div className='superBoard'>
            {superBoardState.map((subBoard, i) => (
                <SubBoard 
                    key={i} 
                    subBoardIndex={i} 
                    subBoardState={subBoard} 
                    onClick={onSubBoardClick}
                    isActive={requiredSubBoard === i}  // Highlight if this is the active subboard
                />
            ))}
        </div>
    );
}

export default SuperBoard;
