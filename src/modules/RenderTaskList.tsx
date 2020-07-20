import React from 'react';
import { DownloadRenderTaskList, Task, User } from './interfaces';

export const RenderTaskList = ({ tasks, users }: DownloadRenderTaskList) => {
  return (
    <ul>
      {
        (tasks as Task[]).map((task: Task) => {
          const user: User = (users.find(person => person.id === task.userId)) as User;

          return (
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
                  {user.name}
                </p>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};
