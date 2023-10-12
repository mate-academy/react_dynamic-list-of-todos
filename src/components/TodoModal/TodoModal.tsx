import React from 'react';
import { Loader } from '../Loader';
import { todoContext, DefaultValueType } from '../../Contexts/Context';

export const TodoModal: React.FC = () => {
  const {
    currentItem,
    setCurrentItem,
  } = React.useContext(todoContext) as DefaultValueType;

  async function resolveUser() {
    if (!currentItem) {
      return;
    }

    const currUser = await currentItem.user;

    setCurrentItem({ ...currentItem, user: currUser });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = React.useCallback(resolveUser, []);

  React.useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        currentItem?.user instanceof Promise
          ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${currentItem.todo.id}`}
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
                  {currentItem.todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className={
                    currentItem.todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                  >
                    {currentItem.todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {currentItem.user.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
