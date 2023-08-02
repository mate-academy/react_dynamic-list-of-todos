import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  pickTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  pickedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({ todos, pickTodo, pickedTodo }) => {
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
          const isPicked = pickedTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isPicked,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>

              {todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}

              <td className="is-vcentered is-expanded">
                <p className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                  onClick={() => pickTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn({
                        'far fa-eye': !isPicked,
                        'far fa-eye-slash': isPicked,
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
