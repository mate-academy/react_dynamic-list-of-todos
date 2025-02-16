import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
type Props = {
  visibleTodos: Todo[];
  setSelectedTodo: (value: Todo | null) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setSelectedTodo,
  selectedTodo,
}) => {
  const handleSelectPost = (todo: Todo) => {
    setSelectedTodo(todo);
  };

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
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            className={cn('', {
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
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
                className={cn('has-text', {
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                {selectedTodo?.id === todo.id ? (
                  <span className="icon">
                    <i
                      className="far fa-eye-slash"
                      onClick={() => handleSelectPost(todo)}
                    />
                  </span>
                ) : (
                  <span className="icon">
                    <i
                      className="far fa-eye"
                      onClick={() => handleSelectPost(todo)}
                    />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
