import React from 'react';
import './TodoList.scss';

type Props = {
  visibleTodos: Todo[];
  searchValue: string;
  filterBy: string;
  onSelectUser: (userId: number) => void;
  onSearchTodo: (query: string) => void;
  onFilterTodo: (filterValue: string) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  searchValue,
  filterBy,
  onSelectUser,
  onSearchTodo,
  onFilterTodo,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      placeholder="Filter by title"
      value={searchValue}
      onChange={(event) => {
        onSearchTodo(event.target.value);
      }}
    />

    <select
      id="select"
      value={filterBy}
      onChange={(event) => {
        onFilterTodo(event.target.value);
      }}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {visibleTodos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'}
          >
            <p>{todo.title}</p>

            <button
              className="TodoList__user-button button"
              type="button"
              onClick={() => {
                onSelectUser(todo.userId);
              }}
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
