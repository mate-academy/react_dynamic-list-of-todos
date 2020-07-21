import React from 'react';
import { Prepared } from './interfaces';

type RenderTaskListProps = {
  prepared: Prepared[];
};

export const RenderTaskList = ({ prepared }: RenderTaskListProps) => {
  return (
    <>
      <ul>
        {
          prepared.map((task: Prepared) => {
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
                    {task.user.name}
                  </p>
                </div>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};
