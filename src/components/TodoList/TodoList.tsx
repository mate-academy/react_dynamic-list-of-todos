/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './TodoList.scss';

type Todo = {
  id: number;
  createdAt: string;
  upDatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[]
  onSelect: (selectedId: number) => void
};

export const TodoList: React.FC <Props> = ({ todos, onSelect }) => {
  const [inputedValue, setInputedValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const filteredTodos = [...todos].filter((todo) => {
    return todo.title.includes(inputedValue);
  });

  const selectedTodos = [...filteredTodos].filter((todo) => {
    if (selectedValue === 'all') {
      return todo;
    }

    if (selectedValue === 'active') {
      return todo.completed === false;
    }

    if (selectedValue === 'completed') {
      return todo.completed === true;
    }

    return todo;
  });

  // function shuffleArray(array: Todo[]) {
  //   let curId = array.length;

  //   while (curId !== 0) {
  //     const randId = Math.floor(Math.random() * curId);

  //     curId -= 1;
  //     const tmp = array[curId];

  //     array[curId] = array[randId];
  //     array[randId] = tmp;
  //   }

  //   return array;
  // }

  console.log(inputedValue);

  return (
    <div className="TodoList">
      <form className="form">
        <input
          placeholder="input the title"
          data-cy="filterByTitle"
          value={inputedValue}
          className="form__input"
          onChange={(event) => {
            event.preventDefault();
            setInputedValue(event.target.value);
          }}
        />

        <select
          className="select"
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          <option
            value="all"
          >
            All
          </option>

          <option
            value="active"
          >
            Active
          </option>

          <option
            value="completed"
          >
            Completed
          </option>
        </select>
      </form>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {selectedTodos.map((todo) => (
            <li className="TodoList__item TodoList__item--unchecked">
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              {selectedTodoId === todo.id ? (
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.id);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              ) : (
                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.id);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
