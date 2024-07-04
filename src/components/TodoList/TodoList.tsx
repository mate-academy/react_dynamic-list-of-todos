import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onOpen: (todo: Todo) => void;
  selectedTodoId: number | null;
}

export const TodoList: FC<Props> = ({ todos, onOpen, selectedTodoId }) => {
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
        {todos.map(todo => {
          const { id, title, completed } = todo;
          const isSelected = selectedTodoId === id;

          return (
            <tr
              data-cy="todo"
              className={cn({ 'has-background-info-light': isSelected })}
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
                  onClick={() => onOpen(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
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
};
