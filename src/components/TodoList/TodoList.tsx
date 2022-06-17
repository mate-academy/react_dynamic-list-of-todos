import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void
}

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => {
  const [titleSubstring, setTitleSubstring] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [randomize, setRandomize] = useState(0);

  const random = (min: number, max: number):number => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  };

  if (randomize !== 0) {
    todos.sort(() => random(-1, 1));
  }

  const filteredTodos = () => {
    const showTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(titleSubstring.toLowerCase());
    });

    switch (filterOption) {
      case 'active':
        return showTodos.filter(todo => todo.completed === false);
      case 'completed':
        return showTodos.filter(todo => todo.completed === true);
      default:
        return showTodos;
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            data-cy="filterByTitle"
            type="text"
            placeholder="Enter a substring for search"
            value={titleSubstring}
            onChange={(event) => {
              setTitleSubstring(event.target.value);
            }}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            onChange={(event) => setFilterOption(event.target.value)}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setRandomize(Math.random() + 1);
            }}
          >
            randomize
          </button>
        </div>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos().map(todo => (
            <li
              key={todo.id}
              className={cn('TodoList__item',
                {
                  'TodoList__item--unchecked': todo.completed === false,
                  'TodoList__item--checked': todo.completed === true,
                })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
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
