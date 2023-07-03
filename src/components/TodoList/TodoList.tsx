import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  selectedTodo: Todo | null,
  handleSelectTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos, selectedTodo, handleSelectTodo } = props;

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
        {todos?.map(todo => {
          const { completed, title, id } = todo;
          const isSelected = todo.id === selectedTodo?.id;

          return (
            <tr key={id} data-cy="todo">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={completed === false
                  ? 'has-text-danger'
                  : 'has-text-success'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectTodo(todo)}
                >
                  <span className="icon">
                    <i className={isSelected
                      ? 'far fa-eye-slash'
                      : 'fas fa-eye'}
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
};
