import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setSelectedUserId: (value: number) => void,
  selectedTodoId: number | null,
  setSelectedTodoId: (value: number) => void,
  onReset: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedUserId,
  setSelectedTodoId,
  onReset,
}) => {
  const handleSelect = (id: number, userId: number) => {
    setSelectedTodoId(id);
    setSelectedUserId(userId);
  };

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
        {todos.map(({
          id, title, userId, completed,
        }) => (
          <tr
            data-cy="todo"
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

            <td className={classNames(
              'is-vcentered',
              {
                'is-expanded': completed === false,
              },
            )}
            >
              <p className={classNames('has-text-success',
                {
                  'has-text-danger': completed === false,
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
                onClick={selectedTodoId === id
                  ? onReset
                  : () => handleSelect(id, userId)}
              >
                {selectedTodoId === id
                  ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
