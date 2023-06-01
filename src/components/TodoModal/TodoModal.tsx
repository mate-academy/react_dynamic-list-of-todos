// import { Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

export type TodoM = {
  list: Todo[],
  onCross: () => void,
};

export const TodoModal: React.FC<TodoM> = ({ list, onCross }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {list.length === 0 ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #2
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCross()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                Leanne Graham
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
