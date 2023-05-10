import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  selectedTodo,
  onSelectedTodo,
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
      {todos.map((todo) => {
        const { id, title, completed } = todo;
        const isSelected = id === selectedTodo?.id;

        return (
          <tr
            data-cy="todo"
            className={cn({ 'has-background-info-light': isSelected })}
            key={id}
          >
            <td className="is-vcentered">
              {id}
            </td>

            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={cn({
                'has-text-success': completed,
                'has-text-danger': !completed,
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
                onClick={() => onSelectedTodo(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye': !isSelected,
                    'fa-eye-slash': isSelected,
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
