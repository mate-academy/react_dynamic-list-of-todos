import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  visibleTodos: Todo[],
  query: string;
  filterBy: string;
  selectUser: (userId: number) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectorInput: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    visibleTodos,
    query,
    filterBy,
    selectUser,
    handleSearch,
    handleSelectorInput,
  } = props;

  return (
    <div className="TodoList">
      <h2 className="subtitle pb-2">Todos:</h2>
      <div className="control pb-2">
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Search by title"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="select is-info">
        <select
          value={filterBy}
          onChange={handleSelectorInput}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container pt-2">
        <ul className="TodoList__list">
          {visibleTodos.map((todo) => (
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
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>

              <button
                className="
                  TodoList__user-button
                  button
                "
                type="button"
                onClick={() => selectUser(+todo.userId)}
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
