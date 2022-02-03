import React from 'react';
import classnames from 'classnames';
import './TodoList.scss';

enum CompletionStatus {
  All = '',
  Completed = 'completed',
  Active = 'active',
}

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  changeTodoStatus: (id: number) => void;
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleQuery: string,
  handleStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  statusQuery: string,
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    selectUser,
    changeTodoStatus,
    handleQuery,
    titleQuery,
    handleStatus,
    statusQuery,
  } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label htmlFor="titleQuery">
        Find by Title:
        {' '}
        <input
          type="text"
          id="titleQuery"
          value={titleQuery}
          onChange={handleQuery}
        />
      </label>

      <select value={statusQuery} onChange={handleStatus}>
        <option value={CompletionStatus.All}>all</option>
        <option value={CompletionStatus.Completed}>completed</option>
        <option value={CompletionStatus.Active}>active</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed, 'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`checkbox-${todo.id}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => changeTodoStatus(todo.id)}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => selectUser(todo.userId)}
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
};
