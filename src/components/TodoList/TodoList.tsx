import React, { useState } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/enum/Filter';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
  setActiveTodo: (currentTodo: Todo | null) => void
  activeTodo: Todo | null
  query: string,
  filter: Filter
}

export const TodoList: React.FC<Props> = ({
  query,
  filter,
  todos,
  setActiveTodo,
  activeTodo,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<null | number>(null);

  const filteredTodo = todos
    .filter((todo) => {
      switch (filter) {
        case Filter.All:
          return todo;
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;
        default:
          return todo;
      }
    })
    .filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

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
        {
          filteredTodo
            .map(todo => (
              <tr
                data-cy="todo"
                onMouseEnter={() => setHoveredItemId(todo.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className={classNames({
                  'has-background-info-light':
                    (activeTodo?.id === todo.id) || (hoveredItemId === todo.id),
                })}
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {
                    todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    onClick={() => setActiveTodo(todo)}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': !(activeTodo?.id === todo.id),
                          'fa-eye-slash': activeTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};
