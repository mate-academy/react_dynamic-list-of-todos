import React from 'react';
import cn from 'classnames';
import { useTodos } from '../../utils/TodosContext';
import { Filter } from '../../types/Context';

export const TodoList: React.FC = () => {
  const { todos, filter, query, selectedTodoId, setSelectedTodoId } =
    useTodos();

  let visibleTodos = [...todos];

  if (filter !== Filter.ALL) {
    switch (filter) {
      case Filter.ACTIVE:
        visibleTodos = visibleTodos.filter(item => !item.completed);
        break;
      case Filter.COMPLETED:
        visibleTodos = visibleTodos.filter(item => item.completed);
        break;
      default:
        return;
    }
  }

  if (query) {
    visibleTodos = visibleTodos.filter(item =>
      item.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

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
          <tr data-cy="todo" className="" key={todo.id}>
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
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodoId(todo.id)}
              >
                {selectedTodoId === todo.id ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
