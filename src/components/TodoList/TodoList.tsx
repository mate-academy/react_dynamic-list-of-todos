import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  selectTodo,
  selectedTodoId,
  todos,
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
            'has-background-info-light': selectedTodoId === todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {!todo.completed && <td className="is-vcentered" />}
          {todo.completed && (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )}
          <td className="is-vcentered is-expanded">
            <p className={cn('has-text-success', {
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
              onClick={() => selectTodo(todo.id)}
            >
              <span className="icon">
                <i className={cn('far', {
                  'fa-eye-slash': todo.id === selectedTodoId,
                  'fa-eye': todo.id !== selectedTodoId,
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
