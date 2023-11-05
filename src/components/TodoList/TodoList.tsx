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

  // ігнорувати регістр при фільтрації

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
        {filter.map(todo => todo.title.toLowerCase()
          .includes(input.toLowerCase())
          && (
            <tr data-cy="todo" key={todo.id} className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onClick(todo.id)}
                >
                  <span className="icon">
                    <i className={
                      show && todo.id === isDedicatedUser
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
