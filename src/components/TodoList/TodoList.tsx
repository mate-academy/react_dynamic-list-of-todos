import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [user, setUser] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [todoId, setTodoId] = useState(0);

  if (todos.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => {
            const {
              id,
              userId,
              title,
              completed,
            } = todo;

            return (
              <tr
                key={id}
                data-cy="todo"
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      setUser(userId);
                      setVisibility(true);
                      setTitleModal(title);
                      setTodoId(id);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        visibility === true && (
          <TodoModal
            todoId={todoId}
            userId={user}
            setVisibility={setVisibility}
            title={titleModal}
          />
        )
      }
    </>
  );
};
