import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  chooseTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
}

export const TodoList: FC<TodoListProps> = (
  { todos, chooseTodo, currentTodo },
) => (
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
      {todos.map((todo) => {
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered ">
                {completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
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
                  onClick={() => chooseTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye-slash': id === currentTodo?.id,
                      'fa-eye': id !== currentTodo?.id,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
        );
      })}
    </tbody>
  </table>
);
