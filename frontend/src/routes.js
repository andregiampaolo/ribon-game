import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';


export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/game" component={Game} />
        </BrowserRouter>
    )
}