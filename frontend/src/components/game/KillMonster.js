import React from 'react';
import api from '../../services/api';
import Select from 'react-select';

import monsterIcon from '../../assets/monster.svg'

export default class KillMonster extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          message: '',
          selectedOption: null,
          token: props.token,
          options : [{ value: '', label: 'Aguarde' }]
        };
    }

    componentDidMount(){
        this.getMonsters();
    }
    
    getMonsters = async () => {
        const monsters = await api.get('/monster/list');
        const options = [];
        monsters.data.map(monster => {
            const option = {value: monster._id, label: monster.name};
            options.push(option);
        });

        this.setState({options})
    }

    setMessage = (message) => {
        this.setState({ message });
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        //console.log(`Option selected:`, selectedOption.value);
    };

    kill = async e => {
        e.preventDefault();
        try {
            const response = await api.post('/killed-monster/killed', 
                { monsterId: this.state.selectedOption.value},
                { headers: {'Authorization': `Bearer ${this.state.token}` } }
            );
            if(response.status === 200){
                this.setMessage('Matou!');
            }
        } catch (error) {
            console.log(error);
            this.setMessage('Não foi possível matar o monstro, corra!');
        }
    }

    render (){

        return (
            <div className="block">
                <img src={monsterIcon} alt="Ribon game" className="logo" />
                <form onSubmit={this.kill}>
                    <Select
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.options}
                        />
                    <button type="submit">Matar Monstro</button>
                </form>
                <span className="message">{this.state.message}</span>
            </div>
        );
    }
}