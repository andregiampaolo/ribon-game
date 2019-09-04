import React, { useState } from 'react';
import api from '../../services/api';

import './GameComponents.css';

import dieIcon from '../../assets/die.svg'

export default function Die ( {token} ) {

    const [message, setMessage] = useState('');

    const die = async e => {
        e.preventDefault();
        
        try {
            const response = await api.post('/death/die', 
                {},
                { headers: {'Authorization': `Bearer ${token}` } }
            );
            if(response.status === 200){
                setMessage('Morreu!');
            }
        } catch (error) {
            console.log(error.response.message);
            setMessage('Não foi possível morrer, você é imortal!');
        }
    }

    return (
        <div className="block">
            <img src={dieIcon} alt="Ribon game" className="logo" />
            <form onSubmit={die}>
                <button type="submit">Morrer</button>
            </form>
            <span className="message">{message}</span>
        </div>

    );
}