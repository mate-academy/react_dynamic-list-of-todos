import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
// import { User } from '../../types/User';

type Props = {
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props>
  = ({ setSelectedTodo, selectedTodo }) => {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {
          <Loader /> && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #
                  {selectedTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setSelectedTodo(null)}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className="has-text-danger">Planned</strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {/* {users.name} */}
                  </a>
                </p>
              </div>
            </div>
          )
        }
      </div>
    );
  };
