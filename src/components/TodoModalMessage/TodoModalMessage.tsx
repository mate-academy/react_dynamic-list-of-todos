import React from 'react';
import { User } from '../../types/User';

type Props = {
  title: string;
  user: User | null;
  completed: boolean,
};

export const TodoModalMessage: React.FC<Props> = ({
  title,
  user,
  completed,
}) => {
  return (
    user
      ? (
        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            {completed
              ? (
                <strong className="has-text-success">
                  Done
                </strong>
              )
              : (
                <strong className="has-text-danger">
                  Planned
                </strong>
              )}

            {' by '}

            <a href={`mailto:${user.email}`}>
              {user.name}
            </a>
          </p>
        </div>
      )
      : (
        <div className="modal-card-body">
          <p className="block has-text-danger" data-cy="modal-title">
            Something went wrong :(
          </p>
        </div>
      )
  );
};
