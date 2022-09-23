import React, { useState } from 'react';

import classNames from 'classnames';

import { TodoModal } from '../TodoModal';

import { Todo } from '../../types/Todo';

enum SortType {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

function getReorderedTodos(
  todos: Todo[],
  sortType: SortType,
): Todo[] {
  const visibleTodos = [...todos];

  switch (sortType) {
    case SortType.Active:
      return visibleTodos.filter(todo => {
        return todo.completed === false;
      });

    case SortType.Completed:
      return visibleTodos.filter(todo => {
        return todo.completed === true;
      });

    default:
      return visibleTodos;
  }
}

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(SortType.All);

  const visibleTodos = getReorderedTodos(
    todos,
    sortType,
  );

  const filteredTodos = visibleTodos.filter(todo => {
    const fixedQuery = query.toLowerCase();

    return todo.title.includes(fixedQuery);
  });

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={sortType}
              onChange={({ target }) => {
                // eslint-disable-next-line no-nested-ternary
                return target.value === 'all'
                  ? setSortType(SortType.All)
                  : target.value === 'active'
                    ? setSortType(SortType.Active)
                    : setSortType(SortType.Completed);
              }}
            >
              <option
                value="all"
              >
                All
              </option>
              <option
                value="active"
              >
                Active
              </option>
              <option
                value="completed"
              >
                Completed
              </option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={query}
            onChange={(event) => {
              return setQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {query.length
              ? (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  data-cy="clearSearchButton"
                  type="button"
                  className="delete"
                  onClick={() => setQuery('')}
                />
              )
              : null}
          </span>
        </p>
      </form>

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => {
            return (
              <tr
                data-cy="todo"
                className=""
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      'has-text-success',
                      { 'has-text-danger': !todo.completed },
                    )}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedId(todo.id)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'far',
                          'fa-eye',
                          { 'fa-eye-slash': selectedId === todo.id },
                        )}
                      />
                    </span>
                  </button>

                  {selectedId === todo.id
                    && <TodoModal todo={todo} setUserId={setSelectedId} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
