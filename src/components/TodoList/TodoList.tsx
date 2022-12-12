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
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed
              ? (
                <>
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-success">{todo.title}</p>
                  </td>
                </>
              ) : (
                <>
                  <td className="is-vcentered" />
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-danger">{todo.title}</p>
                  </td>
                </>
              )}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onTodoUserId(todo.userId);
                  onModalStatus(!modalStatus);
                  onSelectedTodo(todo);
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
