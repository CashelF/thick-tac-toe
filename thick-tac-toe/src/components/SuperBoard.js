import React from 'react';
import SubBoard from './SubBoard/SubBoard';
import LineSVG from '../fancy-line.svg';

const SuperBoard = ({ superBoardState, onSubBoardClick }) => {
    return (
        <div style={styles.superBoard}>
            {/* <div style={{ ...styles.lineHorizontal, top: '42%' }} />
            <div style={{ ...styles.lineHorizontal, top: '66%' }} />
            <div style={{ ...styles.lineVertical, left: '33%' }} />
            <div style={{ ...styles.lineVertical, left: '66%' }} /> */}
            {superBoardState.map((subBoard, i) => (
                <SubBoard 
                    key={i} 
                    subBoardIndex={i} 
                    subBoardState={subBoard} 
                    onClick={onSubBoardClick} 
                />
            ))}
        </div>
    );
}

export default SuperBoard;

const styles = {
    superBoard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: '90%',
        height: '90%',
        borderRadius: '5px',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineHorizontal: {
        // display: 'grid',
        // gridTemplateColumns: 'repeat(2, 1fr)',
        // gridTemplateRows: 'repeat(2, 1fr)',
        position: 'absolute',
        width: '70%',
        height: '10%',
        // top: '42%', // Adjust based on your grid layout
        left: '15%',
        backgroundImage: `url(${LineSVG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
    },
    lineVertical: {
        position: 'absolute',
        width: '20%',
        height: '90%',
        // left: '33%', // Adjust based on your grid layout
        top: 0,
        backgroundImage: `url(${LineSVG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        transform: 'rotate(90deg)', // Rotate the line for vertical orientation
    },
}