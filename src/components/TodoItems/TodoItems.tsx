import React from 'react';
import classNames from 'classnames';

type Props = {
  visibleTodos: Todo[];
  selectedUser: number;
  onChangeUser: (id: number) => void;
};

export const TodoItems: React.FC<Props> = (props) => {
  return (
    <>
      {props.visibleTodos.map(todo => (
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
            <input type="checkbox" readOnly />
            <p>{todo.title}</p>
          </label>
          <button
            className={classNames(
              {
                button: true,
                'TodoList__user-button': true,
                'TodoList__user-button--selected': props.selectedUser === todo.userId,
              },
            )}
            type="button"
            onClick={() => props.onChangeUser(todo.userId)}
          >
            {`User #${todo.userId}`}
          </button>
        </li>
      ))}
    </>
  );
};
