import { FC, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectTodo: (todo:Todo) => void
  selectedTodo: Todo
}

export const TodoModal: FC<Props> = ({ selectTodo, selectedTodo }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(person => setUser(person));
  });

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      {
        !user
          ? (<Loader />)
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div className="modal-card-title has-text-weight-medium">
                  {selectedTodo.id}
                </div>
                <a
                  href="#close"
                  className="delete"
                  type="button"
                  onClick={() => selectTodo(null as unknown as Todo)}
                >
                  Close
                </a>
              </header>

              <div className="modal-card-body">
                <p className="block">{selectedTodo.title}</p>

                <p className="block">
                  {
                    selectedTodo.completed
                      ? (<strong className="has-text-success">Done</strong>)
                      : (<strong className="has-text-danger">Planned</strong>)
                  }

                  {' by '}
                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
