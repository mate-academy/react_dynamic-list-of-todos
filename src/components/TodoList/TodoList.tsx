import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  onHide: () => void;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShow,
  onHide,
  selectedTodoId,
}) => (
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
        <tr key={todo.id} data-cy="todo" className="has-background-info-light">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span data-cy="iconCompleted" className="icon has-text-grey">
                <i className="fas fa-check"></i>
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
              className="button is-small"
              type="button"
              onClick={() => {
                if (selectedTodoId === todo.id) {
                  onHide();
                } else {
                  onShow(todo);
                }
              }}
            >
              <span className="icon">
                {selectedTodoId === todo.id ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
