import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  selected: Todo | undefined
  selectTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  selected,
  selectTodo,
}) => {
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
        {todos.map(todo => {
          return (
            <tr data-cy="todo" className="">
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
                <p className={classNames(todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={selected?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'}
                    />
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
