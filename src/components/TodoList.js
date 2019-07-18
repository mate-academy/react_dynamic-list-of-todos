import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <div>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id}/>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
