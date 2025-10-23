import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onShowModal: (value: boolean) => void;
  onSetCurrentTodo: (value: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowModal,
  onSetCurrentTodo,
  currentTodo,
}) => {
  const handleOnButtonClick = (todoId: number) => {
    onSetCurrentTodo(
      todos.find(todo => {
        return todo.id === todoId;
      }) as Todo,
    );
    onShowModal(true);
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
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': currentTodo?.id === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed === true && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': todo.completed === false,
                  'has-text-success': todo.completed === true,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => handleOnButtonClick(todo.id)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={cn({
                      'far fa-eye-slash': currentTodo?.id === todo.id,
                      'far fa-eye': currentTodo?.id !== todo.id,
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
};
