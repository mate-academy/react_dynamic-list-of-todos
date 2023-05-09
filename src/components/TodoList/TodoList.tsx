import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedTodo,
  onTodoSelect,
}) => {
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
          todos.map(todo => {
            const {
              id,
              title,
              completed,
            } = todo;

            const isSelectedTodo = todo.id === selectedTodo?.id;

            return (
              <tr
                data-cy="todo"
                className={cn({ 'has-background-info-light': isSelectedTodo })}
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
                  <p className={completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onTodoSelect(todo)}
                  >
                    <span className="icon">
                      <i className={`far fa-eye${isSelectedTodo ? '-slash' : ''}`} />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
});
