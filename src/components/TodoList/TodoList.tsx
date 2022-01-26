import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

enum FilterParameters {
  All,
  Active,
  Completed,
}

type HandleUserSelect = (userId: number) => void;
type ChangeTodoStatus = (todoTitle: string) => void;
type HandleSearch = (searchTitle: string) => void;
type HandleFilter = (filterParameter: FilterParameters) => void;

type Props = {
  todos: Todo[];
  selectedUserId: number;
  handleUserSelect: HandleUserSelect;
  changeTodoStatus: ChangeTodoStatus;
  handleSearch: HandleSearch;
  handleFilter: HandleFilter;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    selectedUserId,
    handleUserSelect,
    changeTodoStatus,
    handleSearch,
    handleFilter,
  } = props;

  const searchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    handleSearch(title);
  };

  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case '1':
        handleFilter(FilterParameters.Active);
        break;

      case '2':
        handleFilter(FilterParameters.Completed);
        break;

      default:
        handleFilter(FilterParameters.All);
    }
  };

  const changeUser = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <option value={FilterParameters.All}>Show all</option>
        <option value={FilterParameters.Active}>Show active</option>
        <option value={FilterParameters.Completed}>Show completed</option>
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

        {/* <ul className="TodoList__list">
          <li className="TodoList__item TodoList__item--unchecked">
            <label htmlFor="delectus">
              <input type="checkbox" readOnly id="delectus" />
              <p>delectus aut autem</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
            >
              User&nbsp;#1
            </button>
          </li>

          <li className="TodoList__item TodoList__item--checked">
            <label htmlFor="distinctio">
              <input type="checkbox" checked readOnly id="distinctio" />
              <p>distinctio vitae autem nihil ut molestias quo</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
            >
              User&nbsp;#2
            </button>
          </li>
        </ul> */}
      </div>
    </div>
  );
};
