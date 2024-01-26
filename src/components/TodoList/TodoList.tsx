import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const {
    visibleTodos, setModal, setUserTodo, modal,
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
    setUserTodo({ ...todo });
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

        {/* <tr data-cy="todo" className="">
          <td className="is-vcentered">1</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">delectus aut autem</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
        <tr data-cy="todo" className="has-background-info-light">
          <td className="is-vcentered">2</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">quis ut nam facilis et officia qui</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">1</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">delectus aut autem</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">6</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">
              qui ullam ratione quibusdam voluptatem quia omnis
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>

        <tr data-cy="todo" className="">
          <td className="is-vcentered">8</td>
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-success">quo adipisci enim quam ut ab</p>
          </td>
          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
