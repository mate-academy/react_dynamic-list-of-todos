import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onSelectedUserId: (selectedUserId: number) => void,
  sortByTitle: (title: string) => void,
  sortByCompleted: (by: string) => void,
  randomize: () => void,
};

export class TodoList extends React.Component<Props> {
  state = {};

  render() {
    const {
      todos,
      onSelectedUserId,
      sortByCompleted,
      sortByTitle,
      randomize,
    } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <label htmlFor="sort">
            <input
              id="sort"
              type="text"
              placeholder="Enter a title"
              className="TodoList__input"
              onChange={({ target }) => {
                sortByTitle(target.value);
              }}
            />
          </label>
          <select
            onChange={({ target }) => {
              sortByCompleted(target.value);
            }}
            className="TodoList__select"
          >
            <option>all</option>
            <option>active</option>
            <option>completed</option>
          </select>
          <button
            className="button"
            type="button"
            onClick={() => {
              randomize();
            }}
          >
            Randomize
          </button>
          <ul className="TodoList__list">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                  )}
                  type="button"
                  onClick={() => {
                    onSelectedUserId(todo.userId);
                  }}
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
  }
}
