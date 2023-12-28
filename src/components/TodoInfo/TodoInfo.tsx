import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  todoFocusedOn: Todo | null,
  focusOnTodo: (todo:Todo)=>void,
};
export const TodoInfo: React.FC<Props> = (
  {
    todo,
    todoFocusedOn,
    focusOnTodo,
  },
) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      {completed
        ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        ) : (<td className="is-vcentered" />)}
      <td className="is-vcentered is-expanded">
        <p className={
          completed ? 'has-text-success'
            : 'has-text-danger'
        }
        >
          { title }
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => focusOnTodo(todo)}
        >
          <span className="icon">
            <i className={todoFocusedOn?.id === todo.id
              ? 'far fa-eye-slash' : 'far fa-eye'}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
