import { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type TodoListProps = {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoClick,
  selectedTodoId,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  const handleButtonClick = (todo: Todo) => {
    if (selectedTodo === todo.id) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo.id);
    }

    onTodoClick(todo);
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
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleButtonClick(todo)}
              >
                <span className="icon">
                  <i
                    className={`far ${selectedTodoId !== todo.id ? 'fa-eye' : 'fa-eye-slash'}`}
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
