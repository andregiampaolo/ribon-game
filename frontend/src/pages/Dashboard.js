import React from 'react';

import './Dashboard.css';
import logo from '../assets/logo.svg'
import trophyIcon from '../assets/trophy.svg'

export default function Dashboard( { match, history } ){

    const startGame = async e => {
        history.push(`/game/${match.params.token}`);
    }

    const logout = async e => {
        history.push(`/`);
    }

    return (
        <div className="dashboard-container">
            <img src={logo} alt="Ribon game" className="logo" />
                <div className="block-container">
                    <button type="button" onClick={startGame}>Jogar</button>
                    <button type="button" onClick={logout}>Logout</button>
                </div>
                <div className="trophies-container">
                    <img src={trophyIcon} alt="Ribon game" className="logo" />
                </div>
        </div>
    );
}