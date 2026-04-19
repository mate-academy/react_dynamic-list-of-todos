import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTask: Todo | null;
  onSelectTask: (task: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTask,
  onSelectTask,
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
      {todos.map(task => (
        <tr
          data-cy="todo"
          key={task.id}
          className={
            selectedTask?.id === task.id ? 'has-background-info-light' : ''
          }
        >
          <td className="is-vcentered">{task.id}</td>
          <td className="is-vcentered">
            {task.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={
                task.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {task.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelectTask(task)}
            >
              <span className="icon">
                <i
                  className={
                    selectedTask?.id === task.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
