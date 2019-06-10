import React from 'react';
import TodoItem from './TodoItem';


function TodoList(props) {
    const {todos, users} = props;
    return todos.map(todoItem => {
        return (
            <TodoItem
                title={todoItem.title}
                user={users[todoItem.userId]}
                key={todoItem.id}
            />
            )
    });
}

export default TodoList;