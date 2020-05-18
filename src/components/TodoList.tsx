import React from 'react';
import cn from 'classnames';

export const TodoList: React.FC<TodoListProps> = ({ todos, changeStatus }) => {
  return (
    <div>
      {todos.map(({
        completed, user, title, id,
      }) => (
        <button
          type="button"
          className= {cn('alert',
            { 'alert-success': completed, 'alert-primary': !completed })}
          key={id}
          onClick={() => changeStatus(id)}
        >
          <span>{title}</span>
          <span>{user.name}</span>
        </button>
      ))}
    </div>
  );
};

type TodoListProps = {
  todos: TodoNormalized[];
  changeStatus(id: number): void;
};
