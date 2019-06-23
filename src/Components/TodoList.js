import React from 'react';
import todos from './todos';
import TodoItem from './TodoItem'

function TodoList() {
    return (
        <ul className="list">
            {todos.map(todo =>
                <TodoItem userId={todo.userId} key={todo.id} title={todo.title} completed={todo.completed} />
            )}
        </ul>
    )
}

export default TodoList;
