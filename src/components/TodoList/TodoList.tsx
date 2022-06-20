import React, { useState } from 'react';
import './TodoList.scss';
import classnames from 'classnames';

enum Selected {
  All,
  Active,
  Complited,
}

interface Props {
  allTodos: Todo[];
  setSelectedUserId: (id: number) => void;
  selectedUserId: number;
}

export const TodoList: React.FC<Props> = ({
  allTodos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [selectedSelect, setSelectedSelect] = useState(Selected.All);
  const [currentValue, setCurrentValue] = useState('');

  const prepearedTodos = () => {
    const filteredTodos = allTodos.filter(todo => {
      return todo.title.includes(currentValue);
    });

    switch (+selectedSelect) {
      case Selected.Active:
        return filteredTodos.filter(({ completed }) => !completed);

      case Selected.Complited:
        return filteredTodos.filter(({ completed }) => completed);

      default:
        return filteredTodos;
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <div className="d">
          <input
            type="text"
            placeholder="Search by title"
            value={currentValue}
            data-cy="filterByTitle"
            onChange={(event) => {
              setCurrentValue(event.target.value);
            }}
          />
          {' '}
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              setSelectedSelect(+event.target.value);
            }}
          >
            <option value="0">All</option>
            <option value="1">Active</option>
            <option value="2">Complited</option>
          </select>
        </div>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {prepearedTodos().map(todo => (
            <li
              className={classnames(
                'TodoList__item',
                'TodoList__item--unchecked',
                { 'TodoList__item--checked': todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames(
                  'button',
                  'TodoList__user-button',
                  // eslint-disable-next-line max-len
                  { 'TodoList__user-button--selected': selectedUserId === todo.userId },

                )}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  setSelectedUserId(todo.userId);
                }}
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
