import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type HandleUserSelect = (userId: number) => void;
type ChangeTodoStatus = (todoTitle: string) => void;
type HandleSearch = (searchTitle: string) => void;
type HandleFilter = (filterParameter: string) => void;
type HandleUserError = (error: string) => void;

type Props = {
  todos: Todo[];
  selectedUserId: number;
  handleUserSelect: HandleUserSelect;
  changeTodoStatus: ChangeTodoStatus;
  handleSearch: HandleSearch;
  handleFilter: HandleFilter;
  handleUserError: HandleUserError;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    selectedUserId,
    handleUserSelect,
    changeTodoStatus,
    handleSearch,
    handleFilter,
    handleUserError,
  } = props;

  const searchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    handleSearch(title);
  };

  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const param = event.target.value;

    handleFilter(param);
  };

  const changeUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleUserError('');

    const { id } = event.currentTarget.dataset;

    if (id) {
      handleUserSelect(+id);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent) => {
    changeTodoStatus(event.target.id);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="searchInput">
        Filter todos by title:
        <input
          type="text"
          id="searchInput"
          placeholder="Input title"
          onChange={searchInput}
        />
      </label>

      <select
        id="selectTodos"
        placeholder="Input title"
        onChange={filterSelect}
      >
        <option value="All">Show all</option>
        <option value="Active">Show active</option>
        <option value="Completed">Show completed</option>
      </select>

      <div className="TodoList__list-container">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor={todo.title}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleStatusChange}
                id={todo.title}
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={changeUser}
              className={classNames('TodoList__user-button', 'button', {
                'TodoList__user-button--selected': selectedUserId === todo.userId,
              })}
              type="button"
              data-id={todo.userId}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
