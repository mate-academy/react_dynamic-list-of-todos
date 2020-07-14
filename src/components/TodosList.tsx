import React from 'react';
import cn from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          className={cn('todo__item', {
            todo__completed: todo.completed,
          })}
        >
          <p className="todo__title">
            {todo.title}
          </p>
          <p>
            {todo.userCatalog.name}
          </p>
          <p>
            {todo.completed ? 'completed' : 'not completed'}
          </p>
        </div>
      ))}
    </>
  );
};
