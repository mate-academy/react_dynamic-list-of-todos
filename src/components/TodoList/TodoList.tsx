import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  todosFromServer: Todo[];
  selectUser: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props>
  = ({ todosFromServer, selectUser }) => {
    const [filter, setFilter] = useState<string>('');
    // const [selectFilter, setSelectFilter] = useState();

    // const filteredByStatus
    //   = todosFromServer.filter(todo => todo.completed === true);

    const filteredByTitle
      = todosFromServer.filter(todo => todo.title.includes(filter));

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

        <div
          className="select"
        >
          <select>
            <option value="all">all</option>
            <option value="false">active</option>
            <option value="true">completed</option>
          </select>

        </div>

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
