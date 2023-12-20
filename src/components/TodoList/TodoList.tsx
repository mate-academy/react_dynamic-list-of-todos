import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

interface T {
  todos: Todo[];
  filterType: string;
  input: string;
  isDedicatedUser: number;
  setIsDedicatedUser: Dispatch<SetStateAction<number>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<T> = ({
  input,
  todos,
  filterType,
  isDedicatedUser,
  setIsDedicatedUser,
  show,
  setShow,
}) => {
  const filterTodos = (array: Todo[], type: string) => {
    switch (type) {
      case 'active':
        return array.filter(todo => !todo.completed);

      case 'completed':
        return array.filter(todo => todo.completed);

      default:
        return array;
    }
  };

  const onClick = (id: number) => {
    setIsDedicatedUser(id);
    setShow(true);
  };

  const filter = filterTodos(todos, filterType);

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
        {filter.map(({ title, id, completed }) => title.toLowerCase()
          .includes(input.toLowerCase())
          && (
            <tr data-cy="todo" key={id} className="">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${completed ? 'success' : 'danger'}`}>{title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onClick(id)}
                >
                  <span className="icon">
                    <i className={
                      show && id === isDedicatedUser
                        ? 'far fa-eye-slash' : 'far fa-eye'
                    }
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
