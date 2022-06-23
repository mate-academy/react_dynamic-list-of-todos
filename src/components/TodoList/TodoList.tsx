import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/interface';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [todosFiltered, setTodosFiltered] = useState(todos);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('all');

  useEffect(() => {
    const select = () => {
      switch (selected) {
        case 'all':
          return todos;
          break;
        case 'active':
          return todos
            .filter(todo => !todo.completed);
          break;
        case 'completed':
          return todos
            .filter(todo => todo.completed);
          break;
        default:
          return todos;
      }
    };

    setTodosFiltered(select()
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())));
  }, [query, selected, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__sidebar">
        <input
          type="text"
          data-cy="filterByTitle"
          className="input-field"
          placeholder="Enter title of the task"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          title="select"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="all" selected>All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {todosFiltered.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                'TodoList__item--checked')}
            >
              <label>
                {todo.completed ? (
                  <input
                    type="checkbox"
                    readOnly
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    readOnly
                  />
                )}
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                  },
                )}
                data-cy="userButton"
                type="button"
                onClick={() => selectUser(todo.userId)}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
