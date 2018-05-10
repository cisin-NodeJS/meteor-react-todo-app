import React from 'react';
import { AutoForm, AutoField, ErrorField } from 'uniforms-bootstrap3';
import { Link } from 'react-router-dom';

import { LoginSchema } from './userSchema';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin = (data) => {
        const { email, password } = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/todos');
            }
            alert(err.reason);
        });
    };

    render() {
        return (
            <div className="col-md-12">
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <AutoField name="email" placeholder="Email" />
                    <ErrorField name="email" />
                    <AutoField name="password" type="password" placeholder="Password" />
                    <ErrorField name="password" />
                    <button className="btn btn-info" type="submit">Login</button>&nbsp;&nbsp;
                    <Link className="btn btn-link" to="/register">Register</Link>
                </AutoForm>
            </div>
        )
    }
}
