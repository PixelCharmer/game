import React from 'react';
import Maze from './Maze';    // Import the maze component
import './Maze.css';          // Import the CSS styling
import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>The Oxygen Bay - The Path</h1>
            <Maze />
        </div>
    );
};

export default App;
