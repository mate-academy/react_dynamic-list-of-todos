import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  todoModel: Todo | null,
  handelEyeBtn: (id: number) => void;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, todoModel, handelEyeBtn } = props;

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
            className={classNames(
              { 'has-background-info-light': todo.id === todoModel?.id },
            )}
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
                { 'has-text-success': todo.completed },
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
                onClick={() => handelEyeBtn(todo.id)}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      { 'far fa-eye-slash': todo.id === todoModel?.id },
                      { 'far fa-eye': todo.id !== todoModel?.id },
                    )}
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
