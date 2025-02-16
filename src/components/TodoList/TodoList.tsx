import React, { useContext } from 'react';
import { DispatchContext, StatesContext } from '../Context/GlobalStateProvider';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { selectedTodoId, isModalOpened, filteredTodos } =
    useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  return (
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
        {filteredTodos.map(todo => {
          return (
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
                  className={classNames({
                    ['has-text-danger']: !todo.completed,
                    ['has-text-success']: todo.completed,
                  })}
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
                    dispatch({ type: 'pickTodoId', payload: todo.id });
                    dispatch({ type: 'openModal' });
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        ['fa-eye']:
                          !isModalOpened ||
                          (isModalOpened && selectedTodoId !== todo.id),

                        ['fa-eye-slash']:
                          isModalOpened && selectedTodoId === todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
