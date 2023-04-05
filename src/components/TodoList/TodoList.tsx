import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect,
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
          const isSelected = todo.id === selectedTodoId;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isSelected,
              })}
              key={todo.id}
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
                {todo.completed
                  ? (<p className="has-text-success">{todo.title}</p>)
                  : (<p className="has-text-danger">{todo.title}</p>)}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', 'fa-eye', {
                        'fa-eye-slash': isSelected,
                      })}
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
