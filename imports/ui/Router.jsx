import React from 'react';
import { Route } from 'react-router';
import App from './App';

import TodoCreate from './components/Todos/TodoCreate';
import TodoList from './components/Todos/TodoList';
import TodoEdit from './components/Todos/TodoEdit';

import Login from './components/Users/Login';
import Register from './components/Users/Register';

export default () =>
    <App>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/todos" component={TodoList} />
        <Route exact path="/todos/create" component={TodoCreate} />
        <Route exact path="/todos/edit/:_id" component={TodoEdit} />
    </App>