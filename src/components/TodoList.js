import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.loadItems = this.loadItems.bind(this);
        this.sortItems = this.sortItems.bind(this);
    }

    loadApi(url) {
        return fetch(url)
            .then(res => res.json())
            .then(data => data);
    }

    loadItems() {
        Promise.all([
            this.loadApi('https://jsonplaceholder.typicode.com/todos'),
            this.loadApi('https://jsonplaceholder.typicode.com/users'),
        ])
            .then(([todos, users]) => this.setState({
                data: todos.map((item) => ({
                    ...item,
                    user: users.find((user) => item.userId === user.id)
                }))
            }))
    }

    sortItems() {
        this.setState((state) => ({
            data: state.data.sort((a, b) => a.title.localeCompare(b.title))
        }))
    }

    render() {
        return (
            <div>
                <button onClick={this.loadItems}>click</button>
                <button onClick={this.sortItems}>Sort</button>
                <table>
                    <tbody>
                    {this.state.data.map((item) => <TodoItem key={item.title} data={item} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodoList