import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

interface Props {
  todos: Todo[];
  selectedTodoId: number;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodoId, todos } = props;
  const [isModalLoading] = useState(false);

  const getSelectedTodo = () => {
    return todos.find(todo => todo.id === selectedTodoId) || todos[0];
  };

  const todo = getSelectedTodo();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
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
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:hfht">
                GHrhgdgh
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
