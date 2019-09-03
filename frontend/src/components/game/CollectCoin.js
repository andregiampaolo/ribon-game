import React, { useState } from 'react';
import api from '../../services/api';

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
                 setMessage('Moeda coletada com sucesso!');
            }
        } catch (error) {
            console.log(error.response.message);
            setMessage('Não foi possível coletar');
        }

    }

    return (
        <div>
            <form onSubmit={collectCoin}>
                <input
                    type="text"
                    placeholder="Quantidade de moedas quer coletar?"
                    name="quantity"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <button type="submit">Coletar Moeda</button>
            </form>
            <span>{message}</span>
           
        </div>
    );
}
