import React, { ChangeEventHandler } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';
import { getFilteredTodos } from '../../api/api';

type Props = {
  todos: Todo[];
  selectedTodoId: number
  setSelectedId: (key: string, id: number) => void;
  todosSearch: string;
  todosStatus: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  setTodos: (todos: Todo[]) => void;
};

export class TodoList extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const {
      todosSearch,
      todosStatus,
      setTodos,
    } = this.props;

    if (prevProps.todosSearch !== todosSearch || prevProps.todosStatus !== todosStatus) {
      getFilteredTodos(todosSearch, todosStatus)
        .then(todos => setTodos(todos));
    }
  }

  render() {
    const {
      todos,
      selectedTodoId,
      setSelectedId,
      todosSearch,
      todosStatus,
      onChange,
    } = this.props;

    return (
      <div className="TodoList">
        <input
          type="text"
          name="todosSearch"
          value={todosSearch}
          placeholder="Search todo"
          onChange={onChange}
        />

        <select
          name="todosStatus"
          value={todosStatus}
          onChange={onChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(({
              id,
              title,
              userId,
              completed,
            }) => (
              <li
                key={id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': completed,
                    'TodoList__item--unchecked': !completed,
                  },
                )}
              >
                <label htmlFor={`${id}`}>
                  <input
                    id={`${id}`}
                    type="checkbox"
                    checked={completed}
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                {selectedTodoId === id ? (
                  <button
                    type="button"
                    className="TodoList__user-button TodoList__user-button--selected button"
                    onClick={() => {
                      setSelectedId('selectedTodoId', 0);
                      setSelectedId('selectedUserId', 0);
                    }}
                  >
                    {`User #${userId}`}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="TodoList__user-button button"
                    onClick={() => {
                      setSelectedId('selectedTodoId', id);
                      setSelectedId('selectedUserId', userId);
                    }}
                  >
                    {`User #${userId}`}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
