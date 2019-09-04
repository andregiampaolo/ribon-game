import React from 'react';
import api from '../services/api';

export default class ListTrophy extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          trophies: [],
          token: props.token,
        };
    }

    componentDidMount(){
        this.getTrophies();
    }
    
    getTrophies = async () => {
        console.log('Meu token: ', this.state.token);

        const userTrophies = await api.get('/user-trophy/trophies', 
            { headers: {'Authorization': `Bearer ${this.state.token}` } }
        );
        const trophies = [];
        userTrophies.data.map(userTrophy => {
            const trophy = {
                id: userTrophy._id,
                value: userTrophy.trophy.value, 
                label: userTrophy.trophy.action
            };
            trophies.push(trophy);
        });

        this.setState({trophies})
    }

    render (){
        return (
            <ul>
                {this.state.trophies.map( trophy => (
                    <li key={trophy.id}>
                        {trophy.label} - {trophy.value}
                    </li>
                ))}
            </ul>
        );
    }
}