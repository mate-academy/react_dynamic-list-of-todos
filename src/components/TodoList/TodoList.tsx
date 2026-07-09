import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  onModal?: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onModal = () => {},
}: TodoListProps) => {
  const [buttonId, setButtonId] = useState(0);

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
            <tr
              data-cy="todo"
              className={`${buttonId === todo.id ? 'has-background-info-light' : ''}`}
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
                  className={classNames(
                    `has-text-${todo.completed ? `success` : `danger`}`,
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
                    setButtonId(todo.id);
                    onModal(todo.id);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        `far fa-eye${buttonId === todo.id ? `-slash` : ``}`,
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
