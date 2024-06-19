import classNames from "classnames"
import { Todo } from "../../types/Todo"


type Props = {
  todo: Todo;
  setModalOpen: (isOpen: boolean) => void;
  selectTodo: (todo: Todo) => void;
  isOpen: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setModalOpen,
  selectTodo,
  isOpen,
}) => {
  const handleSelectButton = () => {
    setModalOpen(true);
    selectTodo(todo);
  };

  return (
    <tr data-cy="todo" className="" key={todo.id}>
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
          className={classNames(
            todo.completed ? 'has-text-success' : 'has-text-danger',
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
          onClick={() => handleSelectButton()}
        >
          <span className="icon">
            <i
              className={classNames('far', isOpen ? 'fa-eye-slash' : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
