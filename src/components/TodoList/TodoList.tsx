import { FC, memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  showModal: (userId: number, todo: Todo) => void;
}

export const TodoList: FC<Props> = memo(({
  todos,
  selectedTodo,
  showModal,
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
        const {
          id,
          completed,
          title,
          userId,
        } = todo;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo,
            })}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className={classNames('fas', {
                  'fa-check has-text-success': completed,
                  'fa-times has-text-danger': !completed,
                })}
                />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
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
                onClick={() => showModal(userId, todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !selectedTodo,
                    'fa-eye-slash': selectedTodo,
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
));
