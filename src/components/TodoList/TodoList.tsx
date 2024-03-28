import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodo: Todo;
  selectTodo: (event) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectTodo,
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
        const {title, completed, id} = todo;
        const isSelected = selectedTodo.id === todo.id;

        return (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>

            <td className="is-vcentered">
              { completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
              )}
            </td>

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
                onClick={() => {
                  selectTodo(todo)
                }}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye-slash': isSelected,
                    'fa-eye': !isSelected
                  })} />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
