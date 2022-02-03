import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

export enum SortBy {
  true = 'true',
  false = 'false',
  default = '',
}

type Props = {
  todos: Todo[];
  onSelectUser: (userId: number) => void;
  selectedUserId: number;
  query: string;
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterCompleted: SortBy;
  onSelectCompletionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onRandomize: () => void;
};

export const TodoList: React.FC<Props> = (props) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__interactive">
      <label htmlFor="search-query" className="label">
        Search todo&nbsp;
        <input
          className="TodoList__interactive-input"
          type="text"
          id="search-query"
          placeholder="Type search todo"
          value={props.query}
          onChange={(event => props.onChangeSearchInput(event))}
        />
      </label>
      <label htmlFor="select-completed">
        Toggle completion status&nbsp;
        <select
          className="TodoList__interactive-input"
          id="select-completed"
          value={props.filterCompleted}
          onChange={(event) => props.onSelectCompletionChange(event)}
        >
          <option value={SortBy.default}>All</option>
          <option value={SortBy.true}>Completed</option>
          <option value={SortBy.false}>Active</option>

        </select>
      </label>
      <span>
        Random todos&nbsp;
        <button
          className="button TodoList__user-button TodoList__user-button--selected"
          type="button"
          onClick={props.onRandomize}
        >
          Randomize
        </button>
      </span>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {props.todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed })}
          >
            <label htmlFor="checkbox">
              <input
                id="checkbox"
                checked={todo.completed}
                type="checkbox"
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={() => {
                if (todo.userId !== props.selectedUserId) {
                  props.onSelectUser(todo.userId);
                }
              }}
              className={classNames('button TodoList__user-button',
                { 'TodoList__user-button--selected': todo.userId === props.selectedUserId })}
              type="button"
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
