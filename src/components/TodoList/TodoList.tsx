import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo | null;
  todos: Todo[];
  setTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todo, todos, setTodo }) => (
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
      {todos.map(t => (
        <tr key={t.id} data-cy="todo" className="">
          <td className="is-vcentered">{t.id}</td>
          <td className="is-vcentered">
            {t.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={t.completed ? 'has-text-success' : 'has-text-danger'}>
              {t.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              onClick={() => {
                setTodo(t);
              }}
              data-cy="selectButton"
              className="button"
              type="button"
            >
              <span className="icon">
                {todo && todo.id === t.id ? (
                  <i className="far fa-eye-slash" />
                ) : (
                  <i className="far fa-eye" />
                )}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
