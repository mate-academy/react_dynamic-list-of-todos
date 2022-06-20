import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api';

type Props = {
  selectIdOfUser: (userId: number) => void
  selectedUserId: number
};

// eslint-disable-next-line max-len
export const TodoList: React.FC<Props> = ({
  selectIdOfUser,
  selectedUserId,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos));
  }, []);

  function filter(prepareForFilterTodos: Todo[]): Todo[] {
    switch (selectedValue) {
      case 'completed':
        return prepareForFilterTodos.filter(todo => todo.completed);
      case 'active':
        return prepareForFilterTodos.filter(todo => !todo.completed);
      default:
        return prepareForFilterTodos;
    }
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <h4>Filter by title</h4>
        <input
          data-cy="filterByTitle"
          type="text"
          value={title}
          className="TodoList__input"
          placeholder="Enter a title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}

        />
        <h4> Status:</h4>
        <select
          className="TodoList__input TodoList__input "
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option value="all"> All </option>
          <option value="active">Active </option>
          <option value="completed">Completed </option>
        </select>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filter(filteredTodos).map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                className={classNames(
                  'TodoList__user-button button',
                  {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  },
                )}
                type="button"
                onClick={() => {
                  selectIdOfUser(todo.userId);
                }}
              >
                {`User# ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
