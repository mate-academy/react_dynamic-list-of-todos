import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  tasks: Todo[];
  selectTask: (arg0: Todo) => void;
  taskinfo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ tasks, selectTask, taskinfo }) => (
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
      {tasks?.map(task => {
        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': taskinfo?.id === task.id,
            })}
            key={task.id}
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
                onClick={() => selectTask(task)}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye': taskinfo?.id !== task.id,
                      'far fa-eye-slash': taskinfo?.id === task.id,
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
