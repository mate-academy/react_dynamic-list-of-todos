import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
        
    render() {
        
        const todoList = this.props.todos.map(currentTodo => <TodoItem key={currentTodo.id } item={currentTodo} users={this.props.users}/>);
       
        return (  
            <table>
                <thead>
                    <tr><td>Title</td><td>Status</td><td>Author</td></tr>
                </thead>
                <tbody>
                    {todoList}
                </tbody>
            </table>
        );
    }
}

export default TodoList;

