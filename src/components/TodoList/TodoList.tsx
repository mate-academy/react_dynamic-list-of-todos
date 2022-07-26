import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoList: React.FC<Props> = (
  { todos, setSelectedTodo, setModal }
) => (
  <>
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
              <i className={classNames('fas', {
                'fa-check-square has-text-success': todo.completed,
                'fa-exclamation-triangle has-text-danger': !todo.completed,
              })}
              />
            </td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setSelectedTodo(todo);
                  setModal(true);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>

  </>
);
