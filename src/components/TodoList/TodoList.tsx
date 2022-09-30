import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todoId: number;
  setTodoId: (event: number) => number | void;
};

export const TodoList: React.FC<Props> = ({ todos, todoId, setTodoId }) => {
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
            key={todo.id}
            data-cy="todo"
            className={classNames('',
              { 'has-background-info-light': todoId === todo.id })}
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
              <p className={classNames(
                'has-text-success',
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
                onClick={() => ((todoId === todo.id)
                  ? setTodoId(0)
                  : setTodoId(todo.id))}
              >
                <span className="icon">
                  <i className={classNames('far fa-eye',
                    { 'far fa-eye-slash': todoId === todo.id })}
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
