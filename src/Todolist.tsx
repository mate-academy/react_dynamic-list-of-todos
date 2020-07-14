import React from 'react';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todos_container">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="todo"
        >
          <p className="todo_title">
            {todo.title}
          </p>
          <p className="todo_user">{todo.user}</p>
          {todo.completed
            ? <p className="todo_completed">completed</p>
            : <p className="todo_inprocess">in process</p>}
        </div>
      ))}
    </div>
  );
};
