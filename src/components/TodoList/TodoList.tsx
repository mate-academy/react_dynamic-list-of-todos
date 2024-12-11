import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodoId: number | null;
  setSelectTodoId: (todo: number) => void;
};

export const TodoList: React.FC<Props> = props => {
  const { todos, selectTodoId, setSelectTodoId } = props;

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
            className={
              selectTodoId && todo.id === selectTodoId
                ? 'has-background-info-light'
                : ''
            }
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
            <td
              className="has-text-right is-vcentered"
              onClick={() => setSelectTodoId(todo.id)}
            >
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i
                    className={`far ${selectTodoId && todo.id === selectTodoId ? 'fa-eye-slash' : 'fa-eye'}`}
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
