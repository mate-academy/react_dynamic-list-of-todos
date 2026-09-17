import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoItemClick: (todo: Todo) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoItemClick,
  selectedTodoId,
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
      {todos.map(todo => {
        const { title, id, completed } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodoId === id,
            })}
            key={id}
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
                <p
                  className={cn({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" onClick={() => onTodoItemClick(todo)} className="button" type="button">
                <span className="icon">
                    <i className={cn('far', {'fa-eye': selectedTodoId !== id, 'fa-eye-slash':selectedTodoId === id})}/>
                </span>
              </button>
              </td>
            </tr>
        );
      })}
    </tbody>
  </table>
);
