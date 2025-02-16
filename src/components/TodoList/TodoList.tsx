import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../types/Store';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { todos, filterTodos, filterString, selectedTodoId } = state;

  let list = todos;

  if (filterTodos === 'active') {
    list = list.filter(todo => todo.completed === false);
  }

  if (filterTodos === 'completed') {
    list = list.filter(todo => todo.completed === true);
  }

  list = list.filter(todo => todo.title.includes(filterString));

  const selectTodoId = (todoId: number) => {
    dispatch({
      type: 'setSelectedTodoId',
      payload: todoId,
    });
  };

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
        {list.map(todo => (
          <>
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodoId === todo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed === true
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodoId(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        todo.id === selectedTodoId ? 'fa-eye-slash' : 'fa-eye',
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
