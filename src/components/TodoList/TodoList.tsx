import React, { useState } from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [listOfTodos, setListOfTodos] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');

  const filterTodosByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListOfTodos(event.target.value);
  };

  const changeStatusOfTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoStatus(event.target.value);
  };

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      const titleInLowerCase = title.toLowerCase();

      return titleInLowerCase.includes(listOfTodos.toLowerCase());
    });

    switch (todoStatus) {
      case 'active (not completed)':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  return (
    <div className="TodoList">
      <div className="TodoList__navigation">
        <h2 className="title is-3">
          Todos
        </h2>
        <h3>
          Filter todo by title:
        </h3>
        <label>
          <input
            type="text"
            className="TodoList__navigation--input input is-link"
            value={listOfTodos}
            onChange={filterTodosByTitle}
            data-cy="filterByTitle"
          />
        </label>

        <h3>
          Select todo status:
        </h3>

        <div className="select is-link">
          <select
            value={todoStatus}
            onChange={changeStatusOfTodo}

          >
            <option>all</option>
            <option>active (not completed)</option>
            <option>completed</option>
          </select>
        </div>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {preparedTodos.map(({
            userId,
            id,
            title,
            completed,
          }) => (
            <li
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <button
                type="button"
                className={classnames(
                  'button',
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                    selectedUserId === userId,
                  },
                )}
                onClick={() => selectUser(userId)}
                data-cy="userButton"
              >
                {`User ${userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
