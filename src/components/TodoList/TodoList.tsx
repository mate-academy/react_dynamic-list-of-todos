import React, { Dispatch, useEffect, useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  onSelectedUserId: Dispatch<number>;
  onShuffle: () => void;
  onDefaulte: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onSelectedUserId,
  onShuffle,
  onDefaulte,
}) => {
  const [titleQuery, setTitleQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [typeOfTodos, setTypeOfTodos] = useState('All');

  useEffect(() => {
    setFilteredTodos(todos.filter(todo => {
      const todoToLowerCase = todo.title.toLowerCase();
      const queryToLowerCase = titleQuery.toLowerCase();

      const filter = todoToLowerCase.includes(queryToLowerCase);

      switch (typeOfTodos) {
        case 'All':
          return filter;

        case 'Not Completed':
          return filter && todo.completed === false;

        case 'Completed':
          return filter && todo.completed === true;

        default:
          return 'Not existing type of filter exception';
      }
    }));
  }, [titleQuery, todos, typeOfTodos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__nav">
        <label htmlFor="filter">
          Search:
          {' '}
          <input
            type="text"
            id="filter"
            value={titleQuery}
            onChange={({ target }) => {
              setTitleQuery(target.value);
            }}
          />
        </label>
        <label htmlFor="select">
          Show:
          {' '}
          <select
            name="select"
            id="select"
            onChange={({ target }) => {
              setTypeOfTodos(target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="TodoList__buttons-container">
        <button
          type="button"
          className="clear"
          onClick={onShuffle}
        >
          Random
        </button>
        <button
          type="button"
          className="clear"
          onClick={onDefaulte}
        >
          Defaulte
        </button>
      </div>
      <div className="TodoList__list-container">

        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
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
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              {todo.userId && (
                <button
                  className={`
                TodoList__user-button${selectedUserId === todo.userId && '--selected'}
                button
              `}
                  type="button"
                  onClick={() => onSelectedUserId(todo.userId)}
                >
                  {`User: ${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
