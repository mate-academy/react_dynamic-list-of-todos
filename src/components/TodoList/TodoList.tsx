import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodo: (arg0: Todo) => void,
  setShowModalBoolean: (arg0: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodo,
  setShowModalBoolean,
}) => {
  return (
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
          {
            todos.map((todo: Todo) => {
              return (
                <tr
                  data-cy="todo"
                  className=""
                  key={todo.id}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed
                      && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={
                      todo.completed
                        ? 'has-text-success'
                        : 'has-text-danger'
                    }
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
                        setShowModalBoolean(true);
                        setTodo(todo);
                      }}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
