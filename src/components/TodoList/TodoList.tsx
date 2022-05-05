import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import { Todo } from '../../types/type';

type Props = {
  todos: Todo[],
  selectedUserId:(number: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, selectedUserId }) => {
  const [searchTodo, setSearchTodo] = useState('');
  const [selectFilter, setSelectFilter] = useState('All');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      switch (selectFilter) {
        case 'All':
          return todo;
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return todo;
      }
    }));
  }, [selectFilter, todos, searchTodo]);

  const filteredTodo = visibleTodos.filter(todo => todo.title.toLowerCase()
    .includes(searchTodo.toLowerCase()));

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTodo(event.target.value);
  };

  const handleChangeSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(event.target.value);
  };

  const Randomize = () => {
    const temp = filteredTodo;

    setVisibleTodos(temp.sort(() => Math.random() - 0.5));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="App__search">
        <label htmlFor="search-todo" className="App__search-label">
          Search movie:
        </label>
        <input
          type="text"
          id="search-todo"
          className="App__search-input"
          placeholder="Search"
          value={searchTodo}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="selectFilterByOption">
        Select:&nbsp;
        <select
          name="select"
          id="selectFilterByOption"
          defaultValue="All"
          onChange={handleChangeSelect}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <button
        className="button"
        type="button"
        onClick={Randomize}
      >
        Randomize
      </button>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodo.map(todo => (
            <li
              key={todo.id}
              className={`TodoList__item
                  ${todo.completed
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'}`}
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
                  selectedUserId(todo.userId);
                }}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
