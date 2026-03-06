import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Games from '../pages/Games';
import About from '../pages/About';
import Projects from '../pages/Projects';
import TicTacToe from '../components/games/TicTacToe/TicTacToe';
import Sudoku from '../components/games/Sudoku/Sudoku';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/tictactoe" element={<TicTacToe />} />
            <Route path="/games/sudoku" element={<Sudoku />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
        </Routes>
    );
};

export default AppRoutes;
