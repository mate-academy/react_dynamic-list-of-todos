import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

interface Props {
  todos: Todo[],
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
}

enum Select {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos, selectedUserId, setSelectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Select>(Select.all);

  const filteredTodos = todos.filter(todo => {
    const lowerQuery = query.toLowerCase();

    return todo.title.includes(lowerQuery);
  });

  const preparedTodos = filteredTodos.filter(todo => {
    switch (selected) {
      case Select.active: {
        return todo.completed === false;
      }

      case Select.completed: {
        return todo.completed === true;
      }

      default:
        return todo;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        data-cy="filterByTitle"
        type="text"
        placeholder="enter the todo`s title"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <select
        onChange={(event) => {
          setSelected(event.target.value as Select);
        }}
      >
        <option
          value={Select.all}
        >
          Show all
        </option>
        <option
          value={Select.active}
        >
          Show active
        </option>
        <option
          value={Select.completed}
        >
          Show completed
        </option>
      </select>

      <div className="TodoList__list-container">
        <ul data-cy="listOfTodos" className="TodoList__list">
          {preparedTodos.map(todo => (

            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                className={classNames('TodoList__user-button button', {
                  'TodoList__user-button--selected':
                  todo.userId === selectedUserId,
                })}
                type="button"
                onClick={() => {
                  setSelectedUserId(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
