import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../context/TodoProvider';

export const TodoList: React.FC = () => {
  const {
    setIsPressed,
    activeTodo,
    setActiveTodo,
    setIsLoading,
    setIsModalLoading,
    visibleTodos,
  } = useTodos();

  const handleSelect = (todo: Todo) => () => {
    setIsPressed(true);
    setIsLoading(true);
    setIsModalLoading(true);
    setActiveTodo(todo);
  };

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
          <tr data-cy="todo" className="">
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
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
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
                onClick={handleSelect(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': activeTodo !== todo,
                    'fa-eye-slash': activeTodo === todo,
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
};
