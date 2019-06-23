import React from 'react';
import TodoItem from './TodoItem'

function TodoList(props) {
    const { todos, users } = props;
    return (
        <div>
            {/* <button type="button">Sort</button> */}
            <ul className="list">
                {todos.map(todo =>
                    <TodoItem userId={todo.userId} key={todo.id} users={users} title={todo.title} completed={todo.completed} />
                )}
            </ul>
        </div>
    )
}

export default TodoList;
