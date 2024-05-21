import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/Store';
import classNames from 'classnames';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const { filteredTodos, selectedTodo, loading } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <table className="table is-narrow is-fullwidth">
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
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
            {filteredTodos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames(
                  todo.id === selectedTodo.id && 'has-background-info-light',
                )}
                key={todo.id}
              >
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
                    className={classNames(
                      !todo.completed ? 'has-text-danger' : 'has-text-success',
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
                    onClick={() =>
                      dispatch({ type: 'SET_SELECTED', payload: todo.id })
                    }
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          todo.id === selectedTodo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye',
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};
