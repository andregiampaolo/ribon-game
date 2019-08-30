import React from 'react';
import './Login.css';

import logo from '../assets/logo.svg'

export default function Login(){
    return (
        
        <div className="login-container">
            <img src={logo} alt="Ribon game" className="login-logo" />
            <form>
                <input
                    type="text"
                    placeholder="Digite seu email"
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                />
                <button type="submit">Jogar</button>
            </form>
        </div>

    );
}

