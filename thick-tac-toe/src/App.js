import React from 'react';
import Game from './components/Game';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <header className='app-header'>
              Thick Tac Toe
              </header>
            <div className='game-container'>
              <Game />
            </div>
        </div>
    );
}

export default App;
