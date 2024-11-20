import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  filter: Filter;
  search: string;
  todoModalId: number | null;
  onModalButtonClick: (userId: number) => void;
};

export const TodoList = ({
  todos,
  filter,
  search,
  todoModalId,
  onModalButtonClick,
}: Props) => {
  const filteredTodos =
    todos?.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    }) || null;

  if (!filteredTodos) {
    throw new Error('Todos is missing');
  }

  const searchTodo = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

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
        {searchTodo?.map(todo => {
          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {!todo.completed ? (
                <td className="is-vcentered" />
              ) : (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={() => onModalButtonClick(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${todoModalId === todo.id ? '-slash' : ''}`}
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
