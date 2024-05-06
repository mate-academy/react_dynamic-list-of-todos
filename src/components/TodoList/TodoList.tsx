import { FC } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface IProps {
  todos: Todo[];
  isActive: boolean;
  activeButton: number | null;
  setIsActive: () => void;
  setUserId: (id: number) => void;
  setActiveButton: (id: number) => void;
  setActiveTodo: (todo: Todo) => void;
}

export const TodoList: FC<IProps> = ({
  todos,
  isActive,
  setIsActive,
  setUserId,
  activeButton,
  setActiveButton,
  setActiveTodo,
}) => {
  const handleOpenModal = (id: number, userId: number, todo: Todo) => {
    setIsActive();
    setActiveButton(id);
    setUserId(userId);
    setActiveTodo(todo);
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
            className={classNames({ 'has-background-info-light': isActive })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
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
                onClick={() => handleOpenModal(todo.id, todo.userId, todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': activeButton !== todo.id,
                      'fa-eye-slash': activeButton === todo.id,
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
};
