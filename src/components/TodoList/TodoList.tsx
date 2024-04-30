import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setModalIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  userTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setModalIcon,
  setUserTodo,
  userTodo,
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
        <tr data-cy="todo" className="" key={todo.id}>
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
              className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
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
              onClick={() => {
                setModalIcon(true);
                setUserTodo(todo);
              }}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye': todo !== userTodo,
                    'fa-eye-slash': todo === userTodo,
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
