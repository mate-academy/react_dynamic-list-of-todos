import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, onClick }) => {
  return (
    <div className="TodoList">
      <h2>{`Todos: ${todos.length}`}</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <>
              {todo.completed
                ? (
                  <li
                    key={todo.id}
                    className="TodoList__item TodoList__item--checked"
                  >
                    <label>
                      <input type="checkbox" checked readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button--selected button"
                      type="button"
                      name={todo.userId}
                      onClick={onClick}
                    >
                      {`User ${todo.userId}`}
                    </button>
                  </li>
                )
                : (
                  <li
                    key={todo.id}
                    className="TodoList__item TodoList__item--unchecked"
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button--selected button"
                      type="button"
                      name={todo.userId}
                      onClick={onClick}
                    >
                      {`User ${todo.userId}`}
                    </button>
                  </li>
                )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {

};
