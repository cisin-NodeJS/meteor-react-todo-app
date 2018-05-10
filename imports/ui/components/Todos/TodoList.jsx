import React from 'react';
import { Link } from 'react-router-dom';

import TodoHead from './TodoHead';

export default class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            loggedInUser: Meteor.userId()
        };
    }

    componentDidMount() {
        Meteor.call('todo.list', (err, todos) => {
            this.setState({ todos });
        });
    }

    toggleTodo = (index, todo) => {
        Meteor.call('todo.toggle', todo._id, todo.isCompleted, (err, result) => {
            if (err) {
                return alert(err.reason);
            }
            todo.isCompleted = !todo.isCompleted;
            const { todos } = this.state;
            todos[index] = todo;
            this.setState({ todos });
        });
    }

    deleteTodo = (index, todoId) => {
        Meteor.call('todo.remove', todoId, (err, result) => {
            if (err) {
                return alert(err.reason);
            }
            const { todos } = this.state;
            todos.splice(index, 1)
            this.setState({ todos });
        });
    }

    render() {
        const { todos, loggedInUser } = this.state;
        const { history } = this.props;
        return (
            <div className="col-md-12">
                <TodoHead history={history} string='Tasks List' />
                <ul className="list-group">
                    {
                        todos.map((todo, index) => {
                            let classes = 'list-group-item clearfix';
                            if (todo.isCompleted) {
                                classes = classes + ' list-group-item-success';
                            }
                            return (
                                <li className={classes} key={todo._id}>
                                    {todo.title} <small>- {todo.description}</small>
                                    <div className="pull-right" role="group">
                                        {loggedInUser == todo.userId &&
                                            <button type="button" className="btn btn-xs btn-success img-circle" onClick={(e) => this.toggleTodo(index, todo)}>&#x2713;</button>}&nbsp;

                                        {loggedInUser == todo.userId && <button type="button" className="btn btn-xs btn-danger img-circle" data-toggle="tooltip" title="delete" onClick={() => this.deleteTodo(index, todo._id)}>&#xff38;</button>}&nbsp;

                                        {loggedInUser == todo.userId &&
                                            <button className="btn btn-xs btn-info img-circle" data-toggle="tooltip" title="edit" onClick={() => {
                                                history.push("/todos/edit/" + todo._id)
                                            }}><span className="glyphicon glyphicon-pencil"></span></button>}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="btn btn-primary" onClick={() => history.push('/todos/create')}>Create a new todo</button>
            </div>
        )
    }
}
