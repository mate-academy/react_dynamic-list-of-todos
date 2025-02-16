import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  infoTodo: Todo | null;
  setInfoTodo: (todoInfo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  infoTodo,
  setInfoTodo,
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
      {visibleTodos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': infoTodo?.id === id,
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
            <td className="is-expanded is-vcentered">
              <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setInfoTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': infoTodo?.id === id,
                      'fa-eye': infoTodo?.id !== id,
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
