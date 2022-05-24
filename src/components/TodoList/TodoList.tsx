import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setSelectedUserId: (id: number) => void;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [statusOfTodo, setStatusOfTodo] = useState('all');

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });

    switch (statusOfTodo) {
      case 'active':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__input">
        <h3>Select todo title</h3>
        <label>
          <input
            className="TodoList__input--title"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            data-cy="filterByTitle"
          />
        </label>
      </div>
      <div className="TodoList__select">
        <h3>
          Select todo status:
        </h3>
        <select
          value={statusOfTodo}
          onChange={event => setStatusOfTodo(event.target.value)}
          className="TodoList__select--selector"
        >
          <option>all</option>
          <option>active</option>
          <option>completed</option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {preparedTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              {todo.userId && (
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    },
                  )}
                  type="button"
                  data-cy="userButton"
                  value={todo.userId}
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
