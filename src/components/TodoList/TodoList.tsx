import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { Loader } from '../Loader';

interface ForMessage {
  message: (clickButton: boolean) => void;
  setTitle: (title: string) => void;
  filterTodos: Todo[];
  setId: (id: number[]) => void;
}

export const TodoList: React.FC<ForMessage> = ({
  message,
  setTitle,
  filterTodos,
  setId,
}) => {
  const [loading, setLoading] = useState(true);
  const [clickButtonState, setClickButtonState] = useState<{
    [key: number]: boolean;
  }>({});

  const handleClick = (id: number) => {
    setClickButtonState(prevState => {
      const newState = { ...prevState, [id]: !prevState[id] };

      message(newState[id]);

      return newState;
    });
  };

  useEffect(() => {
    getTodos().then(() => setLoading(false));
  }, []);

  return loading ? (
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
        {filterTodos.map(todo => (
          <tr
            key={todo.id}
            className={classNames('', {
              'has-background-info-light': clickButtonState[todo.id],
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <span className="icon">
                <i className={classNames({ 'fas fa-check': todo.completed })} />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                className="button"
                type="button"
                onClick={() => {
                  handleClick(todo.id);
                  setTitle(todo.title);
                  setId([todo.id]);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !clickButtonState[todo.id],
                      'fa-eye-slash': clickButtonState[todo.id],
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
