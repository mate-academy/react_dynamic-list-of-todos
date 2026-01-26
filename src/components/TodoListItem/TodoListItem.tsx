import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectTodo: () => void;
  isSelected: boolean;
};

export const TodoListItem: React.FC<Props> = ({
  todo,
  selectTodo,
  isSelected,
}) => {
  function handleSelectClick() {
    selectTodo();
  }

  return (
    <tr
      data-cy="todo"
      className={isSelected ? 'has-background-info-light' : ''}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleSelectClick()}
        >
          <span className="icon">
            <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
