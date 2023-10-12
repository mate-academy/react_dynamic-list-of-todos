import React from 'react';
import { Loader } from '../Loader';
import { todoContext, DefaultValueType } from '../../Contexts/Context';

export const TodoModal: React.FC = () => {
  const {
    currentItem,
    setCurrentItem,
  } = React.useContext(todoContext) as DefaultValueType;

  const { user, todo } = currentItem;

  React.useEffect(() => {
    async function resolveUser() {
      if (!currentItem) {
        return;
      }

      const currUser = await currentItem.user;

      setCurrentItem({ ...currentItem, user: currUser });
    }

    resolveUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        user instanceof Promise
          ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${todo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => {
                    setCurrentItem(prev => {
                      return {
                        ...prev,
                        isVisible: !prev.isVisible,
                      };
                    });
                  }}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className={
                    todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
