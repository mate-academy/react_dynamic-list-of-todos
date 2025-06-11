import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: Dispatch<SetStateAction<Todo | null>>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onTodoSelect,
}) => (
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
      {todos.map(todo => {
        const isTodoSelected = selectedTodo?.id === todo.id;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': isTodoSelected,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : undefined}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoSelect(todo)}
              >
                <span className="icon">
                  {/* {fa-eye-slash} */}
                  <i
                    className={cn(
                      'far',
                      isTodoSelected ? 'fa-eye-slash' : 'fa-eye',
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
