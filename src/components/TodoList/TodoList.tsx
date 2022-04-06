import React, { useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onClickSelectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onClickSelectUser,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const todosSelectArrFilter = (arr: Todo[], completedValue: string) => {
    switch (completedValue) {
      case 'active':
        return arr.filter(todo => todo.completed === false);

      case 'completed':
        return arr.filter(todo => todo.completed === true);

      default:
        return arr;
    }
  };

  const todosInputFilter = (arr: Todo[], titleValue: string) => {
    if (!titleValue) {
      return arr;
    }

    return arr.filter(todo => todo.title.includes(titleValue));
  };

  const preparedTodosArr = () => {
    const copyTodos = [...todos];

    const filterByInput = todosInputFilter(copyTodos, inputValue);

    const filterBySelect = todosSelectArrFilter(filterByInput, selectValue);

    return filterBySelect;
  };

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <input
          className="TodoList__input"
          type="text"
          value={inputValue}
          onChange={handlerInput}
        />

        <select
          className="TodoList__input"
          name="select"
          onChange={handleSelect}
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
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {preparedTodosArr().map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
              key={todo.id}
            >
              <label htmlFor={todo.id.toString()}>
                <input
                  id={todo.id.toString()}
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
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
                onClick={() => onClickSelectUser(todo.userId)}
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
