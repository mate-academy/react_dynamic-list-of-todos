import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  setSelectedUserId: (userId: number) => void;
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setSelectedUserId,
  setSelectedTodo,
  selectedTodo,
}) => {
  const handleShowModalWindow = (userId: number, todo: Todo) => {
    return setSelectedUserId(userId), setSelectedTodo(todo);
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
        {todos.map(todo => {
          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo?.id === todo.id,
              })}
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
                  onClick={() => handleShowModalWindow(+todo.userId, todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far ', {
                        'fa-eye': selectedTodo?.id !== todo.id,
                        'fa-eye-slash': selectedTodo?.id === todo.id,
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
