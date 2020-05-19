import React from 'react';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="collection">
      {todos.map(({
        id, title, completed, user,
      }) => (
        <li
          className="collection-item"
          key={id}
        >
          <span className="name">{user.name}</span>
          <p>{title}</p>
          <i className={classNames(
            'material-icons',
            'medium',
            { 'cyan-text': completed, 'pink-text darken-4': !completed },
          )}
          >
            {completed ? 'sentiment_very_satisfied' : 'sentiment_dissatisfied'}
          </i>
        </li>
      ))}
    </ul>
  );
};
