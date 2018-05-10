import React, { Component } from 'react';
import { AutoForm, AutoField, ErrorField } from 'uniforms-bootstrap3';
import { Link } from 'react-router-dom';

import { RegisterSchema } from './userSchema';

export default class Register extends Component {
    constructor() {
        super();
    }

    onSubmit = (data) => {
        Meteor.call('user.register', data, (err) => {
            if (!err) {
                Meteor.loginWithPassword(data.email, data.password, (err) => {
                    if (err) {
                        return alert(err.reason);
                    }
                    this.props.history.push('/todos');
                });
            } else {
                return alert(err.reason)
            }
        });
    };


    render() {
        return (
            <div className="col-md-12">
                <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
                    <AutoField name="email" placeholder="Email" />
                    <ErrorField name="email" />
                    <AutoField name="password" type="password" placeholder="Password" />
                    <ErrorField name="password" />
                    <AutoField name="confirm_password" type="password" placeholder="Confirm password" />
                    <ErrorField name="confirm_password" />
                    <button className="btn btn-info" type="submit">Create account</button>
                    <Link className="btn btn-link" to="/">Back</Link>
                </AutoForm>
            </div>
        )
    }
}