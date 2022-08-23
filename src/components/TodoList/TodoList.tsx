import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setSelectedTodo: (arg0: Todo) => void,
  openedTodoModal: boolean,
  setOpenedTodoModal: (arg0: boolean) => void,
  setLoading: (arg0: boolean) => void,
}

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    setSelectedTodo,
    setOpenedTodoModal,
    openedTodoModal,
    setLoading,
  } = props;

  const handleClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenedTodoModal(true);
    setLoading(true);
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
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              classNames('', { 'has-background-info-light': false })
            }
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': todo.completed === false },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i className={
                    classNames(
                      'far fa-eye', { 'fa-eye-slash': openedTodoModal },
                    )
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
