import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  selectTodo: (todo: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoList: React.FC<TodoListProps>
= ({ todos, selectTodo, selectedTodo }) => {
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
            data-cy="todo"
            className={
              cn({ 'has-background-info-light': selectedTodo?.id === todo.id })
            }
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.title}

              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye': selectedTodo?.id !== todo.id,
                    'fa-eye-slash': selectedTodo?.id === todo.id,
                  })}
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
