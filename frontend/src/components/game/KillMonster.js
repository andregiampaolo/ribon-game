import React, { useState } from 'react';
import api from '../../services/api';

export default function KillMonster ( {token} ) {

    const [monsters, setMonsters] = useState(
        [{'id': 1, 'name': 'some text'}, {'id': 2, 'name': 'some other text'}]
    );

    const [message, setMessage] = useState('');

    const kill = async e => {
        e.preventDefault();
        
        try {
            const response = await api.post('/killed-monster/killed', 
                {},
                { headers: {'Authorization': `Bearer ${token}` } }
            );
            if(response.status === 200){
                setMessage('Matou!');
            }
        } catch (error) {
            console.log(error.response.message);
            setMessage('Não foi possível matar o monstro, corra!');
        }
    }

    const getMonsters = async () => {
        const monsters = await api.get('/monster/list');
        return monsters;
    }

    const onChange = event => {
        this.setState({ selectedMsgTemplate: event.target.value });
    };

    return (
        <div>
            <form onSubmit={die}>
                
                <select className="form-control" value={currentValue} onChange={onChange}>
                    <option value="">
                        Select um monstro
                    </option>
                    {monsters.map(monster => (
                        <option key={monster.id} value={monster.id}>
                            {monster.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Matar Monstro</button>
            </form>
            <span>{message}</span>
        </div>
    );
}