import React, { FC } from 'react';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => {
        const {
          id,
          userId,
          userName,
          title,
          completed,
        } = todo;

        return (
          <div key={id} className="todo">
            <p className="todo__item">
              Task
              {' '}
              {id}
            </p>
            <p className="todo__item">
              UserID:
              {' '}
              {userId}
            </p>
            <p className="todo__item">
              User:
              {' '}
              {userName}
            </p>
            <p className="todo__item">
              Task:
              {' '}
              {title}
            </p>
            <p className="todo__item">
              Completed:
              {' '}
              {completed ? '✔' : '❌'}
            </p>
          </div>
        );
      })}
    </div>
  );
};
