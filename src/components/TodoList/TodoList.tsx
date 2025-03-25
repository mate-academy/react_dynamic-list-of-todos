import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  handleSelectTodo: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: Todo,
  ) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleSelectTodo,
  selectedTodo,
}: Props) => (
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
      {todos.map(indTodo => {
        const { id, title, completed } = indTodo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === id,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            {completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={event => handleSelectTodo(event, indTodo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': selectedTodo === null,
                      'fa-eye-slash': selectedTodo !== null,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
