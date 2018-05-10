import React from 'react';
import { AutoForm } from 'uniforms-bootstrap3';

import TodoSchema from '/db/todos/schema';
import TodoHead from './TodoHead';

export default class TodoEdit extends React.Component {
    constructor() {
        super();
        this.state = { todo: null };
    }

    componentDidMount() {
        Meteor.call('todo.get', this.props.match.params._id, (err, todo) => {
            this.setState({ todo });
        });
    }

    submit = (todo) => {
        Meteor.call('todo.edit', this.props.match.params._id, todo, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('todo modified!')
        });
    };

    render() {
        const { history } = this.props;
        const { todo } = this.state;

        return (
            <div className="col-md-12">
                <TodoHead history={history} string='Edit Task' />
                {todo ?
                    <AutoForm onSubmit={this.submit} schema={TodoSchema} model={todo} /> :
                    <div>Loading....</div>}
                    <br />
                <a href="javascript:void(0);" onClick={() => history.push('/todos')}><span className="glyphicon glyphicon-menu-left"></span>Back</a>
            </div>
        )
    }
}
