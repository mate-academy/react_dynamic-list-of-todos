import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId: selectedTodo,
  setSelectedTodoId: setSelectedTodo,
}) => {
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
        {todos.map(todo => {
          const { completed, id, title } = todo;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': id === selectedTodo,
              })}
              key={id}
            >
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
                  className={cn({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(id)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': id !== selectedTodo,
                        'fa-eye-slash': id === selectedTodo,
                      })}
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
};
