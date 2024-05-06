import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
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
    {todos.map(todo => (
      <tbody key={todo.id}>
        <tr data-cy="todo" className="">
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
                todo.completed ? `has-text-success` : 'has-text-danger'
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
              onClick={() => setActiveTodo(todo)}
            >
              <span className="icon">
                {/* <i className="far fa-eye" /> */}
                <i
                  className={
                    activeTodo === todo ? 'far fa-eye-slash' : `far fa-eye`
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    ))}
  </table>
);
