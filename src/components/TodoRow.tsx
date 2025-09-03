
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoRowProps = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
};

export const TodoRow: React.FC<TodoRowProps> = ({ todo, onSelect }) => (
  <tr data-cy="todo" className="">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered" />
    <td className="is-vcentered is-expanded">
      <p className="has-text-danger">{todo.title}</p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        onClick={() => onSelect(todo)}
        data-cy="selectButton"
        className="button"
        type="button"
      >
        <span className="icon">
          <i className="far fa-eye" />
        </span>
      </button>
    </td>
  </tr>
);
