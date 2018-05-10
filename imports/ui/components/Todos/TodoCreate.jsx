import React from 'react';
import { AutoForm } from 'uniforms-bootstrap3';

import TodoSchema from '/db/todos/schema';
import TodoHead from './TodoHead';

export default class TodoCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (todo) => {
        Meteor.call('todo.create', todo, (err) => {
            if (err) {
                return alert(err.reason);
            }
            const { history } = this.props;
            history.push('/todos');
        });
    };

    render() {
        const { history } = this.props;

        return (
            <div className="col-md-12">
                <TodoHead history={history} string='Create Task' />
                <AutoForm onSubmit={this.submit} schema={TodoSchema} /> <br />
                <a href="javascript:void(0);" onClick={() => history.push('/todos')}><span className="glyphicon glyphicon-menu-left"></span>Back</a>
            </div>
        )
    }
}
