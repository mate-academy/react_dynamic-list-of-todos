/* eslint-disable react/jsx-key */
import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  listOfTodos: Todo[];
  todoSelected: Todo | null;
  onSelected: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  listOfTodos,
  todoSelected,
  onSelected,
}) => {
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
        {listOfTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': todoSelected?.id === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
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
                  onSelected(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={cn(
                      { 'far fa-eye-slash': todoSelected?.id === todo.id },
                      { 'far fa-eye': todoSelected?.id !== todo.id },
                    )}
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
