import React, { useState } from 'react';
import api from '../../services/api';
import './GameComponents.css';

import coin from '../../assets/coin.svg'

export default function CollectCoin ( {token} ) {

    const [message, setMessage] = useState('');
    const [quantity, setQuantity] = useState('');

    const collectCoin = async e => {
        e.preventDefault();
        
        try {
            const response = await api.post('/collected-coin/collect', 
                { value : quantity },
                { headers: {'Authorization': `Bearer ${token}` } }
            );
            if(response.status === 200){
                setQuantity('');
                setMessage('Moeda coletada com sucesso!');
            }
        } catch (error) {
            console.log(error.message);
            setMessage('Não foi possível coletar');
        }

    }

    return (
        <div className="block">
            <img src={coin} alt="Ribon game" className="logo" />
            <form onSubmit={collectCoin}>
                <input
                    type="text"
                    placeholder="Quer quantas moedas?"
                    name="quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <button type="submit">Coletar Moeda</button>
            </form>
            <span className="message">{message}</span>
        </div>
    );
}
