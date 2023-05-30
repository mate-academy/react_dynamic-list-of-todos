import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  isEyeOpenFor: number | null,
  setDetails: (arg0: Todo)=> void,
  queryFilter: string,
  statusFilter: string,
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  isEyeOpenFor,
  setDetails,
  queryFilter,
  statusFilter,
}) => {
  const [visibleTodo, setVisibleTodo] = useState<Todo[]>(todos);

  const filterByQuery = ():void => {
    const filteredByQuery = !queryFilter ? todos : todos
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(queryFilter.toLocaleLowerCase()));

    const filteredByStatusAndQuery = statusFilter !== 'all'
      ? filteredByQuery.filter(todo => (statusFilter === 'completed'
        ? todo.completed === true
        : todo.completed === false))
      : filteredByQuery;

    setVisibleTodo(filteredByStatusAndQuery);
  };

  useEffect(filterByQuery, [queryFilter, statusFilter]);

  return (
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

        {visibleTodo.map(todo => {
          const {
            id, title, completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed
          && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={
                  `has-text-${completed
                    ? 'success'
                    : 'danger'}`
                }
                >
                  {title}

                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setDetails(todo)}
                >
                  <span className="icon">
                    <i className={`far ${id === isEyeOpenFor
                      ? 'fa-eye-slash'
                      : 'fa-eye'
                    }`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}

        {/* <tr data-cy="todo" className="">
          <td className="is-vcentered">1</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="">delectus aut autem</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
        <tr data-cy="todo" className="has-background-info-light">
          <td className="is-vcentered">2</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">quis ut nam facilis et offia qui</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">1</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">delectus aut autem</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">6</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">
              qui ullam ratione quibusdam voluptatem quia omnis
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">8</td>
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-success">quo adipisci enim quam ut ab</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
