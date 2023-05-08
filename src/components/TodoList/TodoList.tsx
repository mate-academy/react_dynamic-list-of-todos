import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
  setSelectedTodoId: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
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
          className={cn(
            { 'has-background-info-light': todo.id === selectedTodoId },
          )}
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
            <p className={cn(
              { 'has-text-success': todo.completed },
              { 'has-text-danger': !todo.completed },
            )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                setSelectedTodoId(todo.id);
              }}
            >
              <span className="icon">
                <i className={cn('far',
                  { 'fa-eye-slash': selectedTodoId === todo.id },
                  { 'fa-eye': selectedTodoId !== todo.id })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
);
