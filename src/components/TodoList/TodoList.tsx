import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  showedTodos: Todo[];
  selectedTodo: Todo | null;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  showedTodos,
  selectedTodo,
  onTodoSelect,
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
      {showedTodos.map(todo => (
        <tr key={todo.id} data-cy="todo" className="">
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
              onClick={() => onTodoSelect(todo)}
            >
              <span className="icon">
                <i
                  className={
                    selectedTodo === null ? 'far fa-eye' : 'far fa-eye-slash'
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
