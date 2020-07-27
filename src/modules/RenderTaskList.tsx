import React from 'react';
import { PreparedTasks } from './interfaces';

type RenderTaskListProps = {
  preparedTasks: PreparedTasks[];
};

export const RenderTaskList = ({ preparedTasks }: RenderTaskListProps) => (
  <ul>
    {
      preparedTasks.map(task => (
        <li key={task.id} className="list">
          <div className="task-zone">
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
            />
            <p className="task">
              {task.title[0].toUpperCase() + task.title.slice(1)}
            </p>
          </div>
          <div>
            <p className="name">
              {task.user.name}
            </p>
          </div>
        </li>
      ))
    }
  </ul>
);
