import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodo: (value: Todo) => void;
  selectedTodo: Todo | null;
};

const TodoListComponent: React.FC<Props> = ({
  todos,
  setSelectedTodo,
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
      {todos.length > 0 ? (
        todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className="has-background-info-light"
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span
                className="icon"
                data-cy={todo.completed ? 'iconCompleted' : ''}
              >
                <i className={todo.completed ? 'fas fa-check' : 'fas'}></i>
              </span>
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
                onClick={() => setSelectedTodo(todo)}
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
        ))
      ) : (
        <tr>
          <td colSpan={4}>No todo found</td>
        </tr>
      )}
    </tbody>
  </table>
);

export const TodoList: React.FC<Props> = React.memo(TodoListComponent);
