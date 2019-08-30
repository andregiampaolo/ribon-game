import React from 'react';

export default function Game( { match } ){
    return (
        <div>
            <h1>Board do game!</h1>
            <p>token: {match.params.token}</p>
        </div>
    );
}