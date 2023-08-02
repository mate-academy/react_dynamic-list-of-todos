import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  clickedUser: Todo | null
  setClickedUser: React.Dispatch<React.SetStateAction<Todo | null>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  clickedUser,
  setClickedUser,
}) => {
  const handleClickUser = (todo: Todo) => {
    setClickedUser(todo);
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={clickedUser?.id === todo.id
              ? 'has-background-info-light'
              : ''}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
            <td className="is-vcentered is-expanded">
              <p
                className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClickUser(todo)}
              >
                <span className="icon">
                  {clickedUser?.id === todo.id
                    ? (<i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
