import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  isSelected: (value: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  isSelected,
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
      {
        todos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">1</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-danger': todo.completed === false,
                'has-text-success': todo.completed === true,

              })}
              >
                {todo.title }
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => isSelected(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye': todo.id !== selectedTodo?.id,
                      'far fa-eye-slash': todo.id === selectedTodo?.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
