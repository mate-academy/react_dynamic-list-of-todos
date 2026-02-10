import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectedTodo,
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
      {todos.map((todo, index: number) => {
        const isCompleted = todo.completed;
        const isSelected = selectedTodo?.id === todo.id;

        const rowClass = classNames({
          'has-background-info-light': isCompleted,
        });

        const iconClass = classNames('far', {
          'fa-eye-slash': isSelected,
          'fa-eye': !isSelected,
        });

        const colorTitle = classNames({
          'has-text-success': isCompleted,
          'has-text-danger': !isCompleted,
        });

        return (
          <tr data-cy="todo" className={rowClass} key={todo.id}>
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {isCompleted && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={colorTitle}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelect(todo);
                }}
              >
                <span className="icon">
                  <i className={iconClass} />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
