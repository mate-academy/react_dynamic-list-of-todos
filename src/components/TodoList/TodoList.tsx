import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setActiveTodo: Dispatch<SetStateAction<null | Todo>>;
  activeTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setActiveTodo,
  activeTodo,
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
        <tr
          data-cy="todo"
          className={activeTodo?.id === todo.id
            ? 'has-background-info-light' : ''}
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
          <td className="is-vcentered is-expaчnded">
            <p
              className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {activeTodo?.id === todo.id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setActiveTodo(null);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setActiveTodo(todo);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
