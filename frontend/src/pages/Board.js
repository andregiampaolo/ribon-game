import React from 'react';
import Hole from './Hole';
import './Board.css';

export default function Board(){

    const createMoleHoles = () => {
        var holes = [];
        for(let i = 1; i <= 9; i++){
          holes.push(<Hole key={ i }/>);
        }
        return (
          <div className="board">
            { holes }
          </div>
        );
    }

    return(
        <div>
            {createMoleHoles()}
        </div>
    )
}