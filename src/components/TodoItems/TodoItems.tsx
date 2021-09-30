import React from 'react';
import classNames from 'classnames';

type Props = {
  visibleTodos: Todo[];
  selectedUser: number;
  onChangeUser: (id: number) => void;
};

export const TodoItems: React.FC<Props> = (props) => {
  const { visibleTodos, selectedUser, onChangeUser } = props;

  return (
    <ul>
      {visibleTodos.map(todo => (
        <li
          key={todo.id}
          className={classNames(
            {
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            },
          )}
        >
          <label>
            <input
              type="checkbox"
              readOnly
              checked={todo.completed}
            />
            <p>{todo.title}</p>
          </label>
          <button
            className={classNames(
              {
                button: true,
                'TodoList__user-button': true,
                'TodoList__user-button--selected': selectedUser === todo.userId,
              },
            )}
            type="button"
            onClick={() => onChangeUser(todo.userId)}
          >
            {`User #${todo.userId}`}
          </button>
        </li>
      ))}
    </ul>
  );
};
