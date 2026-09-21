import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
type Props = {
  todoList: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
};
export const TodoList: React.FC<Props> = ({
  todoList,
  onTodoSelect,
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
        {todoList.map(todoItem => (
          <tr data-cy="todo" className="" key={todoItem.id}>
            <td className="is-vcentered">{todoItem.id}</td>
            <td className="is-vcentered">
              {todoItem.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': todoItem.completed,
                  'has-text-danger': !todoItem.completed,
                })}
              >
                {todoItem.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onTodoSelect(todoItem);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye-slash': todoItem.id === selectedTodo?.id,
                      'far fa-eye': todoItem.id !== selectedTodo?.id,
                    })}
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
