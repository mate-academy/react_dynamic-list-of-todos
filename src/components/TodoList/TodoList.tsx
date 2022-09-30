import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibelTodos:Todo[];
  setActiveTodo: (todo:Todo) => void;
  activeTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  visibelTodos,
  activeTodo,
  setActiveTodo,
}) => {
  const handleActiveTodo = (todo:Todo) => (
    activeTodo !== todo
    && setActiveTodo(todo)
  );

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
        {visibelTodos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="far fas fa-check" />
                </span>
              )}

            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
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
                onClick={() => handleActiveTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames({
                    'far fa-eye-slash': (!!activeTodo),
                    'far fa-eye': (activeTodo === null),
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
