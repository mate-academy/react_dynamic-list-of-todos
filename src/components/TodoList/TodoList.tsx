import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectTodo,
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={cn({
            'has-background-info-light': selectedTodo?.id === todo.id,
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
            <p className={todo.completed
              ? 'has-text-success'
              : 'has-text-danger'}
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
                <i
                  className={
                    selectedTodo?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
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
