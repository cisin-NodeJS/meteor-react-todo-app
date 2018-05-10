import {Mongo} from "meteor/mongo";
import TodoSchema from './schema'

const Todos = new Mongo.Collection('todos');

Todos.attachSchema(TodoSchema);

export default Todos;