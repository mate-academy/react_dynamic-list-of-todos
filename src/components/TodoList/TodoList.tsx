// import { type } from 'os';
import './TodoList.scss';
import React, { useState } from 'react';
import { Todo } from '../types';

type Props = {
  todos: Todo[]
  selectId: (userId: number, todoID: number) => void
  selectedtodoId: number,
  todoId: (todoId: number) => void
};

export const TodoList: React.FC<Props>
  = ({
    todos, selectId, selectedtodoId, todoId,
  }) => {
    const [inputValue, setinputValue] = useState('');
    const [selectValue, setselectValue] = useState('all');

    let visibleTodo = todos.filter(todo => {
      if (todo.title.toLowerCase().includes(inputValue.toLowerCase())) {
        return todo;
      }

      return '';
    });

    switch (selectValue) {
      case 'all':
        visibleTodo = visibleTodo.filter(todo => todo);
        break;
      case 'active':
        visibleTodo = visibleTodo.filter(todo => todo.completed === false);
        break;
      case 'completed':
        visibleTodo = visibleTodo.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <label htmlFor="input">
            Filter
            {' '}
            <input
              id="input"
              type="text"
              value={inputValue}
              onChange={(event) => setinputValue(event.target.value)}
            />
          </label>
          <select
            name="visibleTodos"
            id="visibleTodos"
            value={selectValue}
            onChange={(event) => setselectValue(event.target.value)}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
          <ul className="TodoList__list">
            {visibleTodo.map(todo => (
              <li className={`TodoList__item TodoList__item--${selectedtodoId === todo.id ? 'checked' : 'unchecked'}`} key={todo.id}>
                <label>
                  {selectedtodoId === todo.id ? (
                    <input
                      type="checkbox"
                      readOnly
                      onClick={() => {
                        todoId(0);
                      }}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      readOnly
                      onClick={() => {
                        todoId(todo.id);
                      }}
                    />
                  )}
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                  type="button"
                  onClick={() => selectId(todo.userId, todo.id)}
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
