import React, { useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal/TodoModal';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [modalOn, setModalOn] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>(todos[0]);
  const [slachEye, setSlashEye] = useState(false);

  return (
    <>
      {modalOn
        && (
          <TodoModal
            modalOn={modalOn}
            setModalOn={setModalOn}
            currentTodo={currentTodo}
          />
        )}

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
          {todos.map(todo => (
            <tr
              className={classnames({ 'has-background-info-light': modalOn })}
              data-cy="todo"
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i
                    className={classnames(
                      'fas',
                      { 'fa-check': todo.completed },
                    )}
                  />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classnames(
                    { 'has-text-success': todo.completed },
                    { 'has-text-danger': !todo.completed },
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setModalOn(true);
                    setCurrentTodo(todo);
                    setSlashEye(!slachEye);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classnames(
                        'far',
                        'fa-eye',
                        {
                          'fa-eye-slash': modalOn
                            && todo.id === currentTodo.id,
                        },
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
