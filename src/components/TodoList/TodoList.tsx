import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../types/TodoType';

type Props = {
  todos: Todo[],
  chooseUserId: (userId: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  chooseUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const handlerFilter = () => {
    const filteredTodos = todos.filter((selectedTodo) => {
      const conditionOfSelect = selectedTodo.title
        .toLowerCase().includes(query.trim().toLowerCase());

      if (query.trim() !== '' && status === 'all') {
        return conditionOfSelect;
      }

      if (status === 'completed') {
        return conditionOfSelect && selectedTodo.completed;
      }

      if (status === 'active') {
        return conditionOfSelect && !selectedTodo.completed;
      }

      return true;
    });

    setVisibleTodos(filteredTodos);
  };

  useEffect(() => {
    setVisibleTodos(todos);
    handlerFilter();
  }, [todos, query, status]);

  return (
    <div className="TodoList">
      <h2>
        Todos:&nbsp;
        {visibleTodos.length}
        &nbsp;from&nbsp;
        {todos.length}
      </h2>
      <div className="Todolist__inputs-group">
        <div className="Todolist__inputs">
          <input
            className="Todolist__input"
            data-cy="filterByTitle"
            type="text"
            name="title"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <p className="Todolist__input-name">
            Search a case
          </p>
        </div>
        <div className="Todolist__inputs">
          <select
            className="Todolist__input"
            name="status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value="all">
              Demonstrate all
            </option>
            <option value="active">
              Demonstrate active
            </option>
            <option value="completed">
              Demonstrate completed
            </option>
          </select>
          <p className="Todolist__input-name">
            Select status
          </p>
        </div>
      </div>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map((todo) => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              {todo.userId && (
                <button
                  type="button"
                  data-cy="userButton"
                  onClick={() => chooseUserId(Number(todo.userId))}
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                        selectedUserId === Number(todo.userId),
                    },
                  )}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              )}

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
