import React from 'react';
import CollectCoin from '../components/game/CollectCoin';
import Die from '../components/game/Die';
import KillMonster from '../components/game/KillMonster';


import '../components/game/GameComponents.css';
import logo from '../assets/logo.svg'

export default function Game( { match, history }){
    
    const backToDashboard = async e => {
        history.push(`/dashboard/${match.params.token}`);
    }

    return(
        <div className="container">
            <img src={logo} alt="Ribon game" className="logo" />
            <div className="block-container">
                <CollectCoin token={match.params.token}/>
                <Die token={match.params.token}/>
                <KillMonster token={match.params.token}/>
            </div>
            <button onClick={backToDashboard} className="button-back" >Voltar</button>
        </div>
    )
}