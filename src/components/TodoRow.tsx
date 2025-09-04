type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoRowProps = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoRow: React.FC<TodoRowProps> = ({
  todo,
  onSelect,
  selectedTodoId,
}) => (
  <tr data-cy="todo" className="">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered" />
    {todo.completed && (
      <span className="icon" data-cy="iconCompleted">
        <i className="fas fa-check" />
      </span>
    )}
    <td className="is-vcentered is-expanded">
      <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        onClick={() => onSelect(todo)}
        data-cy="selectButton"
        className="button"
        type="button"
      >
        <span className="icon">
          {todo.id === selectedTodoId ? (
            <i
            className=
                'far fa-eye-slash' />
          ) : (
            <i
            className='far fa-eye'/>
          )}
        </span>
      </button>
    </td>
  </tr>
);
