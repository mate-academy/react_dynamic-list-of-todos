import React, { useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from '../../context/todo.context';

export const TodoList: React.FC = () => {
  const { visibleTodos, handleSelectTodo, selectedTodo }
    = useContext(TodoContext);

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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </thead>

      <tbody>
        {
          visibleTodos.map(
            todo => (
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
                  <p className={cn({
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
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                        'fa-eye': selectedTodo?.id !== todo.id,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ),
          )
        }
      </tbody>
    </table>
  );
};
