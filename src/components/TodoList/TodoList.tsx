import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  quary: string,
  option: boolean | null,
  showTodoModal: (todo: Todo) => void,
  activeTaskId: number | null;
};

const filteredTodosList = (value: string, todos: Todo[]) => {
  return todos.filter(todo => todo.title
    .toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()));
};

export const TodoList: React.FC<Props> = ({
  todos,
  quary,
  option,
  showTodoModal,
  activeTaskId,
}) => {
  const isDoneStyle = (isDone: boolean) => {
    return classNames({
      'has-text-danger': !isDone,
      'has-text-success': isDone,
    });
  };

  let filteredTodos: Todo[] = [];

  if (option === null) {
    filteredTodos = filteredTodosList(quary, todos);
  } else if (option) {
    filteredTodos = filteredTodosList(quary, todos)
      .filter(todo => todo.completed === true);
  } else {
    filteredTodos = filteredTodosList(quary, todos)
      .filter(todo => todo.completed === false);
  }

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
        {filteredTodos.map(todo => (
          <React.Fragment key={todo.id}>
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : <td className="is-vcentered" />}
              <td className="is-vcentered is-expanded">
                <p className={isDoneStyle(todo.completed)}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => showTodoModal(todo)}
                >
                  <span className="icon">
                    {activeTaskId === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
