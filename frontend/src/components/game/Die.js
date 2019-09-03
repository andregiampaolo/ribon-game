import React, { useState } from 'react';
import api from '../../services/api';

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
        <div>
            <form onSubmit={die}>
                <button type="submit">Morrer</button>
            </form>
            <span>{message}</span>
        </div>
    );
}