import React, { useState } from 'react';
import './Login.css';


import logo from '../assets/logo.svg'

export default function Register( { history } ){

    const [form, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form.name, form.email, form.password);
        history.push('/game');
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
                    placeholder="Digite seu nome"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                />
                <input
                    type="text"
                    placeholder="Digite seu email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                />
                <input
                    type="text"
                    placeholder="Digite sua senha"
                    name="password"
                    value={form.password}
                    onChange={updateField}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <a
                className="link"
                href="/"
            >
                Login
            </a>
        </div>
    )
} 