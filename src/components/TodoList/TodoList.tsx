import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

import cn from 'classnames';
type Props = {
  todos: Todo[];
  onSelectedTodo: (todo: Todo | undefined) => void;
  onSelectedTodoUserId: (userId: number) => void;
  onIsOpen: (value: boolean) => void;
  isOpen: boolean;
};
export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
  onSelectedTodoUserId,
  onIsOpen,
  isOpen,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<number>(0);

  function getTodo(id: number): Todo | undefined {
    return [...todos].find(todo => todo.id === id);
  }

  onSelectedTodo(getTodo(selectedTodo));

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
          return (
            <tr data-cy="todo" className="" key={todo.id}>
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
                  className={cn(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
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
                    setSelectedTodo(todo.id);
                    onSelectedTodoUserId(todo.userId);
                    onIsOpen(true);
                  }}
                >
                  {isOpen && selectedTodo === todo.id ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
