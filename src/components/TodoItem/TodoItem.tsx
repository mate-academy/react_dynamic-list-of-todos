import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onSelect }) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered" />
      <td className={`is-vcentered ${todo.completed ? `is-expanded` : ''}`}>
        <p
          className={`${todo.completed ? `has-text-success` : 'has-text-danger'}`}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
