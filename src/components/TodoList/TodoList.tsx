import classNames from 'classnames';
import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  listOfTodos : Todo[],
  callbackForUserSelect: (id : number) => void;
}

export const TodoList: React.FC<Props> = (
  { listOfTodos, callbackForUserSelect },
) => {
  const [currentFilter, setCurrentFilter]
  = useState('');

  return (
    <div className="TodoList">
      <h2>Filter todos:</h2>
      <input
        type="text"
        onChange={(event) => {
          setCurrentFilter(event.target.value);
        }}
      />
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {listOfTodos.map(singleTodo => (
            singleTodo.title.includes(currentFilter) && (
              <li
                key={singleTodo.id}
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': singleTodo.completed },
                    { 'TodoList__item--unchecked': !singleTodo.completed },
                  )
                }
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={singleTodo.completed}
                  />
                  <p>{singleTodo.title}</p>
                </label>
                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                  onClick={() => {
                    callbackForUserSelect(singleTodo.userId);
                  }}
                >
                  {`User ${singleTodo.userId}`}
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
