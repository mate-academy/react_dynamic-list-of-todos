import React from 'react';
import TodoItem from './TodoItem'

function TodoList(props) {
    const { todos, users, sorting } = props;
    return (
        <div>
            <div className="sorting">
                Sort by:
                <select >
                    {/* onChange={() => sorting(value)}> */}
                    {/* <select value={this.state.value} onChange={this.handleChange}> */}
                    <option selected>Select sorting</option>
                    <option value="users">By User names</option>
                    <option value="todos">By Todos</option>
                </select>
            </div>
            <ul className="list">
                {todos.map(todo =>
                    <TodoItem userId={todo.userId} key={todo.id} users={users} title={todo.title} completed={todo.completed} />
                )}
            </ul>
        </div>
    )
}

export default TodoList;
