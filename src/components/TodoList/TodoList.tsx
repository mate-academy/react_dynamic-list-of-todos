import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect?: (todo: Todo | null) => void;
  setIsOpedModal: (newValue: boolean) => void;
  isOpedModal: boolean;
  setSelectedTodo: (newValue: Todo | null) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsOpedModal,
  setSelectedTodo,
  selectedTodo,
}) => {
  const handleTodoChosen = (todoId:number) => {
    setIsOpedModal(true);
    setSelectedTodo(todos.find(todo => todo.id === todoId) || null);
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
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
            key={todo.id}
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
                className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => handleTodoChosen(todo.id)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': selectedTodo?.id !== todo.id,
                    'fa-eye-slash': selectedTodo?.id === todo.id,
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
