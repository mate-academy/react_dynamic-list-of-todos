import React from 'react'
import { getTodos, getUsers } from './todoService'
import ListItems from './ListItems'
import {
    completedSort,
    titleSort,
    nameSort,
} from './api'

class ToDo extends React.Component {
    state = {
        todos: [],
        load: false,
    }
    async componentDidMount() {
        const [todos, users] = await Promise.all([getTodos(), getUsers()])

        let items = this.getTodoWithUser(users, todos);

        this.setState({
            todos: items,
            load: true,
        })
    }

    sortTodos = (sortField) => {
        let copyTodos = this.state.todos;

        if (sortField === 'completed') {
            completedSort(copyTodos, sortField)
        }
        if (sortField === 'title') {
            titleSort(copyTodos, sortField)
        } else {
            nameSort(copyTodos, sortField)
        }

        this.setState({
            todos: copyTodos
        })
    }

    getTodoWithUser(users, todos) {
        return todos.map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId)
        }))
    }

    render() {
        let { todos } = this.state;
        return (
            this.state.load ? <ListItems sortTodos={this.sortTodos} todos={todos} /> : '...Loading'
        )
    }
}

export default ToDo