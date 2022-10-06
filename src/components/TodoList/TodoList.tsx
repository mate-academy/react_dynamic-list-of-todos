import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Todos = {
  todoList: Todo[],
  setSelectedTodo: (userId: number) => void,
  setSelectedTodoId: (userId: number) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Todos> = (
  {
    todoList, setSelectedTodo, setSelectedTodoId, selectedTodoId,
  },
) => (
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
      {todoList.map(todo => (
        <tr
          data-cy="todo"
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className={classNames(
              { 'has-text-danger': !todo.completed },
              { 'has-text-success': todo.completed },
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
                setSelectedTodo(todo.userId);
                setSelectedTodoId(todo.id);
              }}
            >
              <span className="icon">
                <i className={classNames(
                  'far',
                  'fa-eye',
                  { 'fa-eye-slash': todo.id === selectedTodoId },
                )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
      {/* <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">2</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">quis ut nam facilis et officia qui</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr> */}
    </tbody>
  </table>
);
