import React from 'react';
import TodoItem from './TodoItem'

function TodoList(props) {
    const { todos, sortBy, value } = props;
    return (
        <div>
            <div className="sorting">
                Sort by:
                <select value={value} onChange={sortBy}>
                    <option defaultValue>Select sorting</option>
                    <option value="users">By User names</option>
                    <option value="todos">By Todos</option>
                </select>
            </div>
            <ul className="list">
                {todos.map(todo =>
                    <TodoItem key={todo.id} user={todo.name} title={todo.title} completed={todo.completed} />
                )}
            </ul>
        </div>
    )
}

export default TodoList;







