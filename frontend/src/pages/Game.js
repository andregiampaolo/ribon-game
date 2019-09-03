import React from 'react';
import CollectCoin from '../components/game/CollectCoin';

export default function Game( { match }){
    
    return(
        <div>
            <CollectCoin token={match.params.token}/>
        </div>
    )
}