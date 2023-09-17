import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[],
  setSelectedTodoId: (arg: number) => void,
  selectedTodo: Todo | undefined,
};

export const TodoItem: React.FC<Props> = ({
  filteredTodos,
  setSelectedTodoId,
  selectedTodo,
}) => {
  return (
    <tbody>
      {filteredTodos.map(todo => (
        <tr data-cy="todo" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed === true && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={todo.completed === false
              ? 'has-text-danger'
              : 'has-text-success'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedTodoId(todo.id)}
            >
              <span className="icon">
                <i className={classNames(selectedTodo?.id === todo.id
                  ? 'far fa-eye-slash'
                  : 'far fa-eye')}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
