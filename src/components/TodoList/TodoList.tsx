import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  onClickSetUserId: (v: number) => void;
  onClickSetTodo: (v: Todo) => void;
  oneTodoForCheck: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onClickSetUserId = () => {},
  onClickSetTodo = () => {},
  oneTodoForCheck,
}) => {
  const handleShowModalWindow = (userId: number, todo: Todo) => {
    return onClickSetUserId(userId), onClickSetTodo(todo);
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
                'has-background-info-light': oneTodoForCheck?.id === todo.id,
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
                  onClick={() => handleShowModalWindow(+todo.userId, todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far ', {
                        'fa-eye': oneTodoForCheck?.id !== todo.id,
                        'fa-eye-slash': oneTodoForCheck?.id === todo.id,
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
