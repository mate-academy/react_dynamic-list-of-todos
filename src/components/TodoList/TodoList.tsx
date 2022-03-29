import classNames from 'classnames';
import React, { useState } from 'react';
import './TodoList.scss';

type Props = {
  setSelectedUserId: (userId: number) => void,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  setSelectedUserId,
  todos,
}) => {
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [todosFilter, setTodosFilter] = useState('all');

  const onButtonClick = (id: number, userId: number) => {
    setSelectedUserId(userId);
    setSelectedTodo(id);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodosFilter(event.target.value);
  };

  const filteredTodos = todos
    .filter(todo => todo.title.includes(searchInput))
    .filter(todo => {
      const isCompleted = todo.completed;

      switch (todosFilter) {
        case 'active':
          return !isCompleted;
        case 'completed':
          return isCompleted;
        default:
          return true;
      }
    });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          onChange={onInputChange}
          value={searchInput}
        />

        <select
          value={todosFilter}
          onChange={onSelectChange}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <ul className="TodoList__list">
          {filteredTodos.map(todo => {
            const {
              title,
              id,
              completed,
              userId,
            } = todo;
            const isTodoSelected = selectedTodo === id;

            return (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': completed,
                    'TodoList__item--unchecked': !completed,
                  },
                )}
                key={id}
              >
                <label htmlFor="checkbox">
                  <input
                    id="checkbox"
                    type="checkbox"
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected': isTodoSelected,
                    },
                    'button',
                  )}
                  type="button"
                  onClick={() => onButtonClick(id, userId)}
                >
                  User&nbsp;#
                  {userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
