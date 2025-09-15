import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number | null;
  onSelect: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId = null,
  onSelect,
}) => {
  if (todos.length === 0) {
    return <p data-cy="todosEmpty">No todos found.</p>;
  }

  return (
    <table className="table is-fullwidth is-hoverable" data-cy="todosTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Title</th>
          <th>User</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todoItem => (
          <tr
            key={todoItem.id}
            data-cy={`todo-${todoItem.id}`}
            className={classNames({
              'has-background-light': selectedTodoId === todoItem.id,
            })}
            onClick={() => onSelect(todoItem)}
            style={{ cursor: 'pointer' }}
          >
            <td>{todoItem.id}</td>

            <td className="has-text-centered" data-cy="todoStatus">
              {todoItem.completed ? (
                <span className="icon has-text-success">
                  <i className="fas fa-check" />
                </span>
              ) : (
                <span className="icon has-text-warning">
                  <i className="fas fa-hourglass-half" />
                </span>
              )}
            </td>

            <td>{todoItem.title}</td>
            {/* Aqui vai apenas o userId; o nome/e-mail aparece no modal */}
            <td>{todoItem.userId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
