import React, { useState } from 'react';
import './Login.css';
import api from '../services/api';

import logo from '../assets/logo.svg'

export default function Login( { history } ){

    const [form, setValues] = useState({
        email: 'a@t.com',
        password: '123'
    });

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const response = await api.post('/user/authenticate', {
                email : form.email,
                password : form.password,
            });

            const { token } = response.data;
            history.push(`/dashboard/${token}`);

        } catch (error) {
            console.log(error);
        }

    }

    const updateField = e => {
        setValues({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    return (
        
        <div className="login-container">
            <img src={logo} alt="Ribon game" className="login-logo" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite seu email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    name="password"
                    value={form.password}
                    onChange={updateField}
                />
                <button type="submit">Jogar</button>
            </form>
            <a
                className="link"
                href="/register"
            >
                Cadastrar
            </a>
        </div>

    );
}

