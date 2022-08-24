import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  preparedTodos: Todo[],
  setSelectedTodosId: (selectedTodosId: number | null) => void,
  selectedTodosId: number,
}

export const TodoList: React.FC<Props> = ({
  preparedTodos,
  setSelectedTodosId,
  selectedTodosId,
}) => (
  <table className="table is-narrow is-fullwidth">
    {preparedTodos && (
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
    )}

    <tbody>

      {preparedTodos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )
            : <td className="is-vcentered" />}

          <td className="is-vcentered is-expanded">
            <p
              className={cn(
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
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                setSelectedTodosId(todo.id);
              }}
            >
              <span className="icon">
                <i
                  className={cn(
                    {
                      'far fa-eye': selectedTodosId !== todo.id,
                      'far fa-eye-slash': selectedTodosId === todo.id,
                    },
                  )}
                />
                {' '}
              </span>
            </button>
          </td>
        </tr>

      ))}

    </tbody>
  </table>
);
