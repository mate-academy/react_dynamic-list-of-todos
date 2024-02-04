import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../variables/TodosContext.1';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const {
    visibleTodos,
    setIsModal,
    setModaledTodo,
    modaledTodo,
  } = useContext(TodosContext);

  function getModaledTodo(todoID: number) {
    setModaledTodo(visibleTodos.find(
      todo => todo.id === todoID,
    ) as Todo);
  }

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
        {visibleTodos.map((todo: Todo) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': modaledTodo?.id === todo.id,
            })}
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
              <p className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
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
                  setIsModal(true);
                  getModaledTodo(todo.id);
                }}
              >
                <span className="icon">
                  <i className={todo.id === modaledTodo.id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
