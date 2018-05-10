import React from 'react';

export default class TodoHead extends React.Component {

    logout = (e) => {
        e.preventDefault();
        Meteor.logout(() => {
            const { history } = this.props;
            history.push('/');
        })
    }

    render() {
        const { string } = this.props;
        let userEmail = '';
        if (Meteor.user()) {
            const { emails } = Meteor.user();
            userEmail = emails[0].address;
        }

        return (
            <div>
                <div className="jumbotron">
                    <h1>Todo App</h1>
                    <h3>
                        <span className="pull-right">
                            <small>- {userEmail}</small> &nbsp;&nbsp;<a href="#" onClick={(e) => this.logout(e)} className="logout"> <span className="glyphicon glyphicon-off"></span> logout</a>
                        </span>
                    </h3>
                </div>
                <h3>{string}</h3>
            </div>
        )
    }
}
