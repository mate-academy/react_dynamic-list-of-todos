import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import './todo.list.scss';

interface Props {
  todos: Todo[];

  setButton: (trueOrFalse: boolean) => (void),

  setTodo: (obj: Todo) => (void),

  setListButton: (trueOrFalse: boolean) => (void),

  listButton: boolean,
}

export const TodoList: React.FC<Props> = ({
  todos = [],
  setButton,
  setTodo,
  listButton,
  setListButton,
}) => {
  const [localTodo, setLocalTodo] = useState('');

  const setVariables = (todo: Todo, title: string) => {
    setButton(true);
    setTodo(todo);
    setListButton(true);
    setLocalTodo(title);
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
        {todos.map((todo) => {
          return (
            <tr
              key={todo.id}
              data-cy="todo"
            >
              <td className="is-vcentered">
                {todo.id}
              </td>
              { todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : <td className="is-vcentered" />}

              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
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
                    setVariables(todo, todo.title);
                  }}
                >
                  <span className="icon">
                    {listButton && localTodo === todo.title ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
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
