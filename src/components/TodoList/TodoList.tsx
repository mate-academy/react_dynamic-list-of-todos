import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  chooseTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  chooseTodo,
  selectedTodo,
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
      {todos?.map(todo => {
        const {
          id,
          title,
          completed,
        } = todo;

        const isTextSuccessStyle = completed
          ? 'has-text-success'
          : 'has-text-danger';

        const isTodoSelectedStyle = selectedTodo?.id === id;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': todo.id === selectedTodo?.id,
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
              <p className={isTextSuccessStyle}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  if (todo) {
                    chooseTodo(todo);
                  }
                }}
              >
                <i className={cn('far', {
                  'fa-eye': !isTodoSelectedStyle,
                  'fa-eye-slash': isTodoSelectedStyle,
                })}
                />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
