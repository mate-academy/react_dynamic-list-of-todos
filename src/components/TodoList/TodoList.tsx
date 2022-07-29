import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedTodo,
}) => {
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
          todo.completed
            ? (
              <tr
                data-cy="todo"
                className=""
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      {selectedTodo && selectedTodo.id === todo.id
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            )
            : (
              <tr
                data-cy="todo"
                className=""
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered" />
                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      {selectedTodo && selectedTodo.id === todo.id
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            )))}
      </tbody>
    </table>
  );
};
