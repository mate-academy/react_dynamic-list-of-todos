import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoSelect,
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
      {todos.map(todo => {
        const {
          id,
          completed,
          title,
        } = todo;

        const slected = selectedTodo === todo;

        return (
          <tr
            data-cy="todo"
            className={cn({ 'has-background-info-light': slected })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoSelect(todo)}
              >
                <span className="icon">
                  <i className={`far fa-eye${slected ? '-slash' : ''}`} />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
