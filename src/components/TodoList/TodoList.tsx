import type { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  showModal: (item: Todo) => void;
  selected: Todo | null;
}

export const TodoList = ({ todos, showModal, selected }: TodoListProps) => (
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
      {todos.map((todo, index) => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{index + 1}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered"> </td>
          )}

          <td className="is-vcentered is-expanded">
            <p
              className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
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
              onClick={() => {
                showModal(todo);
              }}
            >
              <span className="icon">
                <i
                  className={classNames({
                    'far fa-eye': selected?.id !== todo.id,
                    'fas fa-eye-slash': selected?.id === todo.id,
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
