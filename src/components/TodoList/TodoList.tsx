import React, { useState } from 'react';
import './TodoList.scss';
import '../../api';

type Props = {
  todos: Todo[];
  randomize: () => void;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, randomize, setSelectedUserId } = props;
  const [searchTitle, setSearchTitle] = useState('');
  const [selectOption, setSelectOption] = useState('all');

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event.target.value);
  };

  const filtredTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(searchTitle.toLowerCase())
      && (
        selectOption === 'all'
        || (selectOption === 'active' && todo.completed === false)
        || (selectOption === 'completed' && todo.completed === true)
      ),
  );

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <input
          className="TodoList__list-searchBar"
          type="text"
          value={searchTitle}
          onChange={searchHandler}
        />
        <div className="TodoList__list-select__container">
          <label htmlFor="select_todo">Choose a todo:</label>

          <select className="TodoList__list-select" onChange={selectHandler}>
            <option value="all">--Please choose an option--</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <button
          className="TodoList__list__randomize"
          type="button"
          onClick={() => {
            randomize();
          }}
        >
          Randomize
        </button>
        <ul className="TodoList__list">
          {filtredTodos.length === 0
            ? 'No todos'
            : filtredTodos.map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    onClick={e => e.preventDefault()}
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
                    setSelectedUserId(todo.userId);
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
};
