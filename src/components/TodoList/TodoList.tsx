import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { TodoContext } from '../../Store';
type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodo }) => {
    const { setSelectedTodo } = useContext(TodoContext);

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
            return (
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
                    className={classNames({
                      'has-text-danger': todo.completed !== true,
                      'has-text-success': todo.completed == true,
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
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                          'fa-eye': selectedTodo?.id !== todo.id,
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
  },
);

TodoList.displayName = 'TodoList';
