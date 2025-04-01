import * as React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShowTodo: (todo: Todo | null) => void; // Додаємо можливість передавати null
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowTodo,
  selectedTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check"></i>
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
            className={todo.completed ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
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
                className="button"
                type="button"
                data-cy="selectButton"
                onClick={() =>
                  onShowTodo(selectedTodo?.id === todo.id ? null : todo)
                } // Тепер можна прибирати вибір
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  ></i>
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
