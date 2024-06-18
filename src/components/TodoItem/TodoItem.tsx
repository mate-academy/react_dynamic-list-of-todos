import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  todo: Todo;
  onSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onSelect, selectedTodo }) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <>
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check"></i>
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-success">{todo.title}</p>
          </td>
        </>
      ) : (
        <>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">{todo.title}</p>
          </td>
        </>
      )}

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            onSelect(todo);
          }}
        >
          <span className="icon">
            <i
              className={`far fa-eye${selectedTodo?.id === todo.id ? '-slash' : ''}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
