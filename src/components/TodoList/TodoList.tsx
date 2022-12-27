import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onTodoUserId: (todoUserId: number | null) => void,
  modalStatus: boolean,
  onModalStatus: (modalStatus: boolean) => void,
  onSelectedTodo: (selectedTodo: Todo | null) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    onTodoUserId,
    modalStatus,
    onModalStatus,
    onSelectedTodo,
    selectedTodo,
  } = props;

  const handleClickSelectButton = (todo: Todo) => {
    onTodoUserId(todo.userId);
    onModalStatus(!modalStatus);
    onSelectedTodo(todo);
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
            data-cy="todo"
            key={todo.id}
            className={classNames(
              {
                'has-background-info-light': selectedTodo?.id === todo.id,
              },
            )}
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
                onClick={() => {
                  handleClickSelectButton(todo);
                }}
              >
                <span className="icon">
                  <i className={
                    selectedTodo?.id === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
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
