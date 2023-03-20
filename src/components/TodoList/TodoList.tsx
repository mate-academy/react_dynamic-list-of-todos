import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: (todoId: number) => void,
  isModalOpen: boolean
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  isModalOpen,
}) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!isModalOpen) {
      setSelected(0);
    }
  }, [isModalOpen]);

  const clickHandler = (event: React.MouseEvent, todoId: number) => {
    event.preventDefault();
    selectedTodo(todoId);
    setSelected(todoId);
  };

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
          <tr data-cy="todo" className="" key={todo.id}>
            {/* data-cy="todo" className="has-background-info-light */}
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : null}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames('',
                {
                  'has-text-success': todo.completed === true,
                  'has-text-danger': todo.completed === false,
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
                onClick={(event) => clickHandler(event, todo.id)}
              >
                <span className="icon">

                  <i className={classNames('far',
                    {
                      'fa-eye': todo.id !== selected,
                      'fa-eye-slash': todo.id === selected,
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
