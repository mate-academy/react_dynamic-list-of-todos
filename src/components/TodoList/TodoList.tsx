import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../TodoContext';

export const TodoList: React.FC = React.memo(() => {
  const {
    todos, selectedTodo, handleSelectedTodo, filterTodos, query, filterOption,
  } = useContext(TodoContext);

  const visibleTodos = filterTodos(todos, query, filterOption);

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
        {visibleTodos.map(todo => (
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
              <p className={classNames(
                {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => handleSelectedTodo(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className={classNames('far',
                    {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
