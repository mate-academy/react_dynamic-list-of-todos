import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  todosFromServer: Todo[];
  selectUser: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props>
  = ({ todosFromServer, selectUser }) => {
    const [filter, setFilter] = useState<string>('');
    const [selectFilter, setSelectFilter] = useState('all');

    const filteredByState
      = todosFromServer.filter(todo => {
        if (todo.completed === true && selectFilter === 'completed') {
          return true;
        }

        if (todo.completed === false && selectFilter === 'active') {
          return true;
        }

        if (selectFilter === 'all') {
          return true;
        }

        return false;
      });

    const filteredByTitle
      = filteredByState.filter(todo => todo.title.includes(filter));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="input"
          type="text"
          value={filter}
          onChange={event => {
            setFilter(event.target.value);
          }}
        />

        <div className="select">
          <select
            value={selectFilter}
            onChange={event => {
              setSelectFilter(event.target.value);
            }}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>

        </div>

        <button
          type="button"
          className="button"
        >
          Randomize
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredByTitle.map(todo => (
              <li
                className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
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
                    selectUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
