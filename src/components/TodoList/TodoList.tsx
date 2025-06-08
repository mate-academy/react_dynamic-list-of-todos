import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todoList: Todo[];
  setSelectedTodo: (value: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todoList,
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
      {todoList.map(todo => {
        const isShown = selectedTodo?.id === todo.id;
        const todoStatus = todo.completed;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({ 'has-background-info-light': isShown })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todoStatus && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={cn(
                  { 'has-text-success': todoStatus },
                  { 'has-text-danger': !todoStatus },
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
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      { 'fa-eye': !isShown },
                      { 'fa-eye-slash': isShown },
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
