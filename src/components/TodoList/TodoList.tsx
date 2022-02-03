import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUser: (userId: number) => void,
  searchTitle: string,
  handleSearchTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearchStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  selectTodo: string,
  changeStatus: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  searchTitle,
  handleSearchTitle,
  selectedUser,
  handleSearchStatus,
  selectTodo,
  changeStatus,
}) => (

  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__search">
      <label htmlFor="search-query" className="label">
        Search todo
        <div className="control">
          <input
            type="text"
            id="search-query"
            className="TodoList__item"
            placeholder="Type search todo"
            value={searchTitle}
            onChange={handleSearchTitle}
          />
        </div>
      </label>
    </div>

    <div className="select">
      <select
        name="selectTodo"
        value={selectTodo}
        onChange={handleSearchStatus}
        className="TodoList__item"
      >
        <option value="all">Show all</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames('TodoList__item',
              { 'TodoList__item--unchecked': !todo.completed },
              { 'TodoList__item--checked': todo.completed })}
            key={todo.id}
          >
            <label htmlFor="search-query">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => changeStatus(todo.id)}
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
              onClick={() => selectedUser(+todo.userId)}
            >
              User #
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
