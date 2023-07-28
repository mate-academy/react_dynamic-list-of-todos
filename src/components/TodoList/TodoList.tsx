import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos, onSelectTodo, selectedTodo,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handlerSelectTodo = (todoId: number, todo: Todo) => {
    setSelectedTodoId(todoId);
    onSelectTodo(todo);
  };

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedTodoId(null);
    }
  }, [selectedTodo]);

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
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn(
                { 'has-background-info-light': selectedTodoId === id },
              )}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={cn(
                  { 'has-text-danger': !completed },
                  { 'has-text-success': completed },
                )}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handlerSelectTodo(id, todo)}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      { 'fa-eye-slash': id === selectedTodoId },
                      { 'fa-eye': id !== selectedTodoId },
                    )}
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
