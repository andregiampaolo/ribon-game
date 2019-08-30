import React from 'react';

export default function Dashboard( { match } ){
    return (
        <div>
            <h1>Dashboard do game!</h1>
            <p>token: {match.params.token}</p>
        </div>
    );
}