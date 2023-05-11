import { FC, memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onClickTodo: (todo: Todo) => void;
  clickedTodoId: number;
}

export const TodoList: FC<Props> = memo(({
  todos,
  onClickTodo,
  clickedTodoId,
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
        {todos.map((todo) => {
          return (
            <tr
              data-cy="todo"
              className={cn('', {
                'has-background-info-light': clickedTodoId,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {
                  todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )
                }
              </td>
              <td className="is-vcentered is-expanded">
                <p className={cn({
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
                  onClick={() => onClickTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn('far',
                      { 'fa-eye': clickedTodoId !== todo.id },
                      { 'fa-eye-slash': clickedTodoId === todo.id })}
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
});
