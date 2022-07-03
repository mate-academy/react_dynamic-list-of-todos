import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classname from 'classnames';
import { getTodos } from '../../api/api';

type Props = {
  userId: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ userId }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [optionValue, setOptionValue] = useState('');
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const lowerInputValue = inputValue.toLowerCase();

  const filterTodo = todos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(lowerInputValue));

  useEffect(() => {
    getTodos()
      .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
      .catch(error => setHasLoadingError(error));
  }, []);

  const filterSelect = (currentTodo: Todo[]) => {
    switch (optionValue) {
      case 'active': {
        return currentTodo.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return currentTodo.filter(todo => todo.completed === true);
      }

      default: {
        return currentTodo;
      }
    }
  };

  const finishTodo = filterSelect(filterTodo);

  return (
    <div className="TodoList">
      {hasLoadingError
        ? <p>Oops ... Something went wrong...</p>
        : (
          <>
            <h2>Todos:</h2>

            <div className="TodoList__list-container">

              <input
                className="input is-rounded"
                value={inputValue}
                placeholder="Enter a title"
                onChange={(event) => {
                  setInputValue(event.currentTarget.value);
                }}
              />

              <div className="select is-rounded is-small">
                <select
                  value={optionValue}
                  onChange={(event) => {
                    setOptionValue(event.currentTarget.value);
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

              </div>

              <ul className="TodoList__list">
                {finishTodo.map(todo => {
                  return (
                    <li
                      key={todo.id}
                      className={classname('TodoList__item', {
                        'TodoList__item--checked': todo.completed,
                        'TodoList__item--unchecked': !todo.completed,
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
                        onClick={() => userId(todo)}
                      >
                        {`User #${todo.userId}`}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
    </div>
  );
};
