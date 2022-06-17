import React, { useState, useEffect } from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  onSelect: CallableFunction,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onSelect,
}) => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('default');

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const filteredTodo = todo.title.includes(query);

      switch (selectedStatus) {
        case 'all':
        default:
          return filteredTodo;

        case 'active':
          return filteredTodo && !todo.completed;

        case 'completed':
          return filteredTodo && todo.completed;
      }
    }));
  }, [query, selectedStatus, todos]);

  const randomizer = () => {
    return setVisibleTodos(
      [...visibleTodos].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <form
          action="submit"
          className="form"
        >
          <input
            type="text"
            className="form__input"
            placeholder="Search by todo title"
            data-cy="filterByTitle"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          <select
            className="form__select"
            value={selectedStatus}
            onChange={(event) => {
              setSelectedStatus(event.target.value);
            }}
          >
            <option value="default" disabled>Choose todo status</option>
            <option value="all">All todos</option>
            <option value="active">Active todos</option>
            <option value="completed">Completed todos</option>
          </select>

          <button
            type="button"
            className="form__button"
            onClick={() => randomizer()}
          >
            Randomize list
          </button>
        </form>
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={`
                TodoList__item
                TodoList__item--${todo.completed ? 'checked' : 'unchecked'}
              `}
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
                data-cy="userButton"
                className={`
                  TodoList__user-button
                  ${todo.userId === selectedUserId ? 'TodoList__user-button--selected' : ''}
                  button
                `}
                type="button"
                onClick={() => onSelect(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
