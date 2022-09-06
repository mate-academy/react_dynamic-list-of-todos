import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoID: number | null;
  onSelectedTodoID: (todoID: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoID,
  onSelectedTodoID,
}) => (
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
      {todos.map(({ id, title, completed }) => (
        <tr
          data-cy="todo"
          key={id}
          className={cn({
            'has-background-info-light': selectedTodoID === id,
          })}
        >
          <td className="is-vcentered">{id}</td>
          <td className="is-vcentered">
            {completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={`has-text-${completed ? 'success' : 'danger'}`}>
              {title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelectedTodoID(id)}
            >
              <span className="icon">
                <i className={
                  `far fa-eye${selectedTodoID === id ? '-slash' : ''}`
                }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
