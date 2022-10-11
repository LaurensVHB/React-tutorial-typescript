import React, { useState } from 'react';
import { Board } from './board';
import "./game.css";

export const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const description = move ? `Go to move # ${move}` : `Go to game start`;

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    let status: string;

    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = history[newHistory.length - 1];
        const squares: string[] = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat([{ squares: squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <p>{status}</p>

                <div className="event-list-wrapper">
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
};

const calculateWinner = (squares: Array<string>) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}