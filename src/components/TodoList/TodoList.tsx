/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context/stateContext';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (state.allTodos.length > 0) {
      setLoaded(false);
    }
  }, [state.allTodos]);

  return loaded ? (
    <Loader />
  ) : (
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
        {state.todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
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
                  dispatch({ type: 'modal', payload: { opened: true, todo } });
                }}
              >
                <span className="icon">
                  {state.inLoadModal.opened &&
                  state.inLoadModal.todo?.id === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
