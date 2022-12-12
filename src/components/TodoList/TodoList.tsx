import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { getTodos, getUser } from '../../api';
// import { Todo } from '../../types/Todo';
// import { User } from '../../types/User';

type Props = {
  allTodos: Todo[],
  onButtonClick: (todo: Todo) => void,
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  allTodos,
  onButtonClick,
  selectedTodo,
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
        {allTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo === todo,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed === true && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-success': todo.completed === true,
                'has-text-danger': todo.completed === false,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered"></td>
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onButtonClick(todo)}
            >
              <span className="icon">
                <i className={classNames(
                  'far',
                  {
                    'fa-eye-slash': selectedTodo === todo,
                    'fa-eye': selectedTodo !== todo,
                  },
                )}
                />
              </span>
            </button>
            {/* </td> */}
          </tr>
        ))}
      </tbody>
    </table >
  );
};
