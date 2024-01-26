import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const {
    visibleTodos, setModal, setSelectedTodo, modal,
  } = useContext(TodosContext);
  const [select, setSelect] = useState<number | null>(null);

  useEffect(() => {
    if (modal) {
      return;
    }

    setSelect(null);
  }, [modal, setModal]);

  const handliClick = (todo: Todo) => {
    setSelect(todo.id);
    setModal(true);
    setSelectedTodo({ ...todo });
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
        {visibleTodos.map((todo: Todo) => (
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
                // className="has-text-danger"
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => handliClick(todo)}
              >
                <span className="icon">
                  <i
                    // className="far fa-eye"
                    className={classNames({
                      'far fa-eye': select !== todo.id,
                      'far fa-eye-slash': select === todo.id,
                    })}
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
