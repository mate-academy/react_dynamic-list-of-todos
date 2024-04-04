import React from 'react';
import { Loader } from '../Loader';
import { FullTodo } from '../../types/FullTodo';
import classNames from 'classnames';

type Props = {
  selectedTodo: FullTodo | null;
  setSelectedTodo: (todo: FullTodo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => (
  <div
    className={classNames('modal', {
      'is-active': selectedTodo,
    })}
    data-cy="modal"
  >
    <div className="modal-background" />

    {!selectedTodo ? (
      <Loader />
    ) : (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => {
              setSelectedTodo(null);
            }}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">
              {selectedTodo.completed ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={'mailto:' + selectedTodo.user?.email}>
              {selectedTodo.user?.name}
            </a>
          </p>
        </div>
      </div>
    )}
  </div>
);
