import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectTodoCard: (todoCard: Todo) => void;
  selectedTodoCard: Todo | null;
}

export const TodoInfo: FC<Props> = ({
  todos,
  onSelectTodoCard,
  selectedTodoCard,
}) => {
  return (
    <>
      {todos.map(todo => {
        const isCardSelected = selectedTodoCard?.id === todo.id;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className=""
          >
            <td className="is-vcentered">
              {todo.id}
            </td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <>
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectTodoCard(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': isCardSelected,
                    'fa-eye': !isCardSelected,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
