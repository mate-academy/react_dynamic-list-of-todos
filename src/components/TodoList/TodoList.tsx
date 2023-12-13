import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, onSelect, selectedTodo } = props;

  const handleSelectTodo = (todo: Todo) => {
    onSelect(todo);
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
          <tr
            data-cy="todo"
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed
              ? (
                <>
                  <td className="is-vcentered" />
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-danger">{todo.title}</p>
                  </td>
                </>
              ) : (
                <>
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className="has-text-success">
                      {todo.title}
                    </p>
                  </td>
                </>
              )}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames('far',
                    { 'fa-eye-slash': selectedTodo === todo },
                    { 'fa-eye': selectedTodo !== todo })}
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
