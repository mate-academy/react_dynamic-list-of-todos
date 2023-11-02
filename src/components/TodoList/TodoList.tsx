import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

interface T {
  todos: Todo[];
  filterType: string;
  input: string;
  setVisibility: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<T> = ({
  input,
  todos,
  filterType,
  setVisibility,
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
    setVisibility(id);
    setShow(true);
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
        {filterTodos(todos, filterType).map(todo => todo.title.includes(input)
          && (
            <tr data-cy="todo" className="">
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
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
