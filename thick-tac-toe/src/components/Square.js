import React from 'react';
import { useState } from 'react';

const Square = ({ value, onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <div 
            style={{ 
                ...styles.square, 
                backgroundColor: hover ? '#e3e3e3' : 'white' 
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        >
            <div style={styles.squareContent}>
                {value}
            </div>
        </div>
    );
}


export default Square;

const styles = {
    square: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        width: '70%',
        paddingTop: '70%',
        margin: 'auto',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    squareContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
    },
}
