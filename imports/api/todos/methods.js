import { Meteor } from 'meteor/meteor'
import { Todos } from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'todo.create'(todo) {
        Security.checkLoggedIn(this.userId);
        todo.userId = this.userId;
        Todos.insert(todo);
    },

    'todo.list'() {
        return Todos.find().fetch();
    },

    'todo.edit'(_id, todoData) {
        Todos.update({ _id: _id, userId: this.userId }, {
            $set: {
                title: todoData.title,
                description: todoData.description,
                updatedAt: new Date()
            }
        });
    },

    'todo.remove'(_id) {
        Todos.remove({ _id: _id, userId: this.userId });
    },

    'todo.get'(_id) {
        return Todos.findOne(_id);
    },

    'todo.toggle' (_id, status) {
        console.log(_id, status)
        return Todos.update({ _id: _id, userId: this.userId }, {
            $set: {
                isCompleted: !status 
            }
        });
    }
});