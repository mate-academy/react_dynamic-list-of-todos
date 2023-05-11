import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoId: number,
  onTodoSelection: (id: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelection,
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
      {todos.map(({ id, title, completed }) => {
        const isSelected = selectedTodoId === id;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': isSelected,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            {completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
              : (
                <td className="is-vcentered" />
              )}

            <td className="is-vcentered is-expanded">
              <p className={cn(
                { 'has-text-danger': !completed },
                { 'has-text-success': completed },
              )}
              >
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className={cn('button',
                  { 'is-link': isSelected })}
                type="button"
                onClick={() => onTodoSelection(id)}
              >

                <span className="icon">
                  {!isSelected
                    ? (<i className="far fa-eye" />)
                    : (<i className="far fa-eye-slash" />)}
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
