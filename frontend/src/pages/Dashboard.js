import React from 'react';

export default function Dashboard( { match, history } ){

    const startGame = async e => {
        console.log('jogar!');
        history.push(`/game/${match.params.token}`);
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard do game!</h1>
            <p>token: {match.params.token}</p>
            <br/>
            <button type="button" onClick={startGame}>Jogar</button>
        </div>
    );
}