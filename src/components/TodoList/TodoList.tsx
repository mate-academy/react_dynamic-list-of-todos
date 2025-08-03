import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  activeTodo: Todo | undefined;
  setVisible: (value: boolean) => void;
  setActiveTodo: (value: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  activeTodo,
  setVisible,
  setActiveTodo,
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
              activeTodo
                ? `${todo.id === activeTodo.id && `has-background-info-light`}`
                : ''
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
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
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
                  setVisible(true);
                  setActiveTodo(todo);
                }}
              >
                {activeTodo ? (
                  <span className="icon">
                    <i
                      className={`far fa-eye${todo.id === activeTodo.id ? '-slash' : ''}`}
                    />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
