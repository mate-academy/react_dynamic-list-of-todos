import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo | null) => void;
};

// eslint-disable-next-line react/display-name
export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodo, selectTodo }) => {
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
              className={cn({
                'has-background-info-light': todo.id === selectedTodo?.id,
              })}
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
                {todo.completed ? (
                  <p className="has-text-success">{todo.title}</p>
                ) : (
                  <p className="has-text-danger">{todo.title}</p>
                )}
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    {todo.id === selectedTodo?.id ? (
                      <i
                        className="far fa-eye-slash"
                        onClick={() => selectTodo(null)}
                      />
                    ) : (
                      <i
                        className={cn('far fa-eye', {})}
                        onClick={() => selectTodo(todo)}
                      />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  (prev, next) => {
    const prevTodosId = prev.todos.map(todo => todo.id);
    const nextTodosId = next.todos.map(todo => todo.id);

    return (
      prev.todos.length === next.todos.length &&
      prevTodosId.every(todoId => nextTodosId.includes(todoId)) &&
      prev.selectTodo === next.selectTodo
    );
  },
);
