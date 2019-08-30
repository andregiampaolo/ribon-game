import React from 'react';

export default function Dashboard( { match } ){
    return (
        <div className="dashboard-container">
            <h1>Dashboard do game!</h1>
            <p>token: {match.params.token}</p>
            <br/>
            <a href="/game">Start game</a>
        </div>
    );
}