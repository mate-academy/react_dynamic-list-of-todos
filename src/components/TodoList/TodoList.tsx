import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  openModal: (todoId: number) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({todos, openModal, selectedTodoId}) => {

  return(
    <>
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
           onClick={() => openModal(todo.id)}
          >
            <span className="icon">
              <i className={selectedTodoId === todo.id ? 'far fa-eye-slash' : 'far fa-eye'}/>
            </span>
          </button>
        </td>
      </tr>
        ))}
    </tbody>
  </table>
    </>
  )
};

