import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: null,
            requested: false,
            loaded: false,
            todoList: []
        }
        this.loadData = this.loadData.bind(this)
    }

    requestUrl(url) {
        return fetch(url)
            .then(result => result.json())
            .then(data => data)
    }

    loadData() {
        this.setState({ requested: true });

        Promise.all([this.requestUrl('https://jsonplaceholder.typicode.com/todos'),
        this.requestUrl('https://jsonplaceholder.typicode.com/users')
        ]).then(([todos, users]) => this.setState({
            loaded: true, todoList: todos.map((todo) => ({
                ...todo, user: users.find((u) => todo.userId === u.id)
            }))
        }))
    }

    render() {
        if (!this.state.requested) {
            return (
                <button className="load-btn" onClick={this.loadData}>Load ToDo List</button>
            )
        } else if (this.state.loaded) {
            return (
                <div key="wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <td><span>Task</span></td>
                                <td><span>User Name</span></td>
                                <td><span>Completed</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todoList.map((item) => <TodoItem item={item} key={item.id} />)}
                        </tbody>
                    </table>
                </div>

            )
        }

        return (
            <button className="load-btn">...Loading...</button>
        )
    }
}

export default TodoList;
