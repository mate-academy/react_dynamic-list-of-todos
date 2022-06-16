import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  alltodos: Todo[];
  setSelectedUserId: (id: number) => void;
  selectedUserId: number;
}

export const TodoList: React.FC<Props> = ({
  alltodos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [selectedselect, setSelectedselect] = useState('All');
  const [currentvalue, setCurrentValue] = useState('');

  const prepearedTodos = () => {
    const filteredTodos = alltodos.filter(todo => {
      return todo.title.includes(currentvalue);
    });

    switch (selectedselect) {
      case 'active':
        return filteredTodos.filter(({ completed }) => !completed);

      case 'complited':
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
            value={currentvalue}
            data-cy="filterByTitle"
            onChange={(event) => {
              setCurrentValue(event.target.value);
            }}
          />
          {' '}
          <select
            onChange={(event) => {
              setSelectedselect(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="complited">Complited</option>
          </select>
        </div>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {prepearedTodos().map(todo => (
            <li
              className="TodoList__item TodoList__item--unchecked"
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className={selectedUserId === todo.userId
                  ? 'TodoList__user-button--selected button'
                  : 'TodoList__user-button button'}
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
