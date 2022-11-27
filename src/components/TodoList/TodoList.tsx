import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number
  setTodoId: (a: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, todoId, setTodoId }) => (
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
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed ? (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            ) : (
              <span className="icon">
                <i className="fas fa" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            {todo.completed ? (
              <p className="has-text-success">{todo.title}</p>
            ) : (
              <p className="has-text-danger">{todo.title}</p>
            )}
          </td>
          <td className="has-text-right is-vcentered">
            {todoId === todo.id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setTodoId(todo.id)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}

      {/* <tr data-cy="todo" className="">
        <td className="is-vcentered">8</td>
        <td className="is-vcentered">

        </td>
        <td className="is-vcentered is-expanded">
          <p className="has-text-success">quo adipisci enim quam ut ab</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr> */}
    </tbody>
  </table>
);
