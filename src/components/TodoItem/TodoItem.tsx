import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleSelectTodo: (todo: Todo) => void,
  selected: boolean,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleSelectTodo,
  selected,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={completed ? 'has-text-success' : 'has-text-danger'}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleSelectTodo(todo)}
        >
          <span className="icon">
            <i className={selected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
