import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Prors = {
  todos: Todo[];
  onSelect: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Prors> = ({
  todos,
  onSelect,
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selectedTodo === todo,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <>
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p className="has-text-success">{todo.title}</p>
              </td>
            </>
          ) : (
            <>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
            </>
          )}
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelect(todo)}
            >
              <span className="icon">
                {selectedTodo === todo ? (
                  <i className="far fa-eye-slash" />
                ) : (
                  <i className="far fa-eye" />
                )}
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
