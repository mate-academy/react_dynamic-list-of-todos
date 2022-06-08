import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  userId: number,
  changeUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  userId,
  changeUserId,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('');
  const [todie, setTodie] = useState<Todo>(Object);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setFilteredTodos(todos.filter(todo => {
      if (todo.title.includes(query.toLowerCase())) {
        switch (option) {
          case 'all':
            return true;

          case 'done':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      }

      return false;
    }));
  }, [todos, query, option]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <label>
          Filter
          <input
            type="text"
            value={query}
            className="TodoList__input"
            data-cy="filterByTitle"
            onChange={event => {
              setQuery(event.target.value);
            }}
          />
        </label>
        <select
          onChange={event => {
            setOption(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="active">Active</option>
        </select>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={() => {
                      setTodie(todo);
                      todie.completed = true;

                      setChecked(!checked);
                    }}
                  />
                  <p>{todo.title}</p>
                </>
              </label>

              <button
                className={classNames('button', {
                  'TodoList__user-button': true,
                  'TodoList__user-button--selected': userId === todo.userId,
                })}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  changeUserId(todo.userId);
                }}
              >
                User
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
