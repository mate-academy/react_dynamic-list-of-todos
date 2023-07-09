import { FC, memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todoId: number | null;
  onSelectTodo: (todo: Todo) => void;
};

export function arePropsEqual(prevProps: Props, currProps: Props): boolean {
  const {
    todos: prevTodos,
    todoId: prevTodoId,
  } = prevProps;

  const {
    todos: currTodos,
    todoId: currTodoId,
  } = currProps;

  if (currTodoId !== prevTodoId) {
    return false;
  }

  if (prevTodos.length !== currTodos.length) {
    return false;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < prevTodos.length; i++) {
    const prevTodo = prevTodos[i];
    const currTodo = currTodos[i];

    const todoKeys = Object.keys(prevTodo);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of todoKeys) {
      if (prevTodo[key] !== currTodo[key]) {
        return false;
      }
    }
  }

  return true;
}

export const TodoList: FC<Props> = memo((props) => {
  const {
    todos,
    todoId,
    onSelectTodo,
  } = props;

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
        {todos.map((todo) => (
          <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={classNames({
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
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': todo.id !== todoId,
                    'fa-eye-slash': todo.id === todoId,
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
}, (prevProps, currProps) => {
  return arePropsEqual(prevProps, currProps);
});
