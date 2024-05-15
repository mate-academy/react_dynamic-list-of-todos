// import React, { useEffect, useState } from 'react';
// import { Loader } from '../Loader';

// import { useEffect, useState } from 'react';
// import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC<Todo> = ({ id, title }) => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // });
  // {
  //   loading && <Loader />;
  // }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{id}
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" data-cy="modal-close" />
        </header>
        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {title}
          </p>
          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">Planned</strong>
            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    </div>
  );
};
