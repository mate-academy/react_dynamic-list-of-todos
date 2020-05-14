import React from 'react';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          className="todo"
        >
          <p>{todo.title}</p>
          <p>{todo.user}</p>
          {todo.completed ? <p>completed</p> : <p>In process</p>}
        </div>
      ))}
    </>
  );
};
