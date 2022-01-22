import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  checkedTodo: number,
  todos: Todo[],
  onSelectedUserId: (selectedUserId: number, checkedTodo: number) => void,
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
      checkedTodo,
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
                  { 'TodoList__item--checked': checkedTodo === todo.id },
                  { 'TodoList__item--unchecked': checkedTodo !== todo.id },
                )}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    type="checkbox"
                    readOnly
                    checked={checkedTodo === todo.id}
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': checkedTodo !== todo.id },
                  )}
                  type="button"
                  onClick={() => {
                    onSelectedUserId(todo.userId, todo.id);
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
