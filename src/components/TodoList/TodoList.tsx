import React from 'react';
import { Todo } from '../../types/Todo';
type Props = {
  todos: Todo[];
  handleToggleModal: (toggle: boolean, selected: Todo) => void;
  selectedTodo: Todo | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleToggleModal,
  selectedTodo,
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
      {todos.map(todo => {
        return (
          <tr
            data-cy="todo"
            className={
              selectedTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
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
                onClick={() => handleToggleModal(true, todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
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
