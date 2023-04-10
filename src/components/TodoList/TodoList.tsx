import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Todos = {
  todos: Todo[];
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number | null>>
};

export const TodoList: React.FC<Todos> = ({
  todos, setUser, setSelectedTodoId,
}) => {
  const handleChangeUser = (selectedUserId: number, selectedTodoId: number) => {
    setSelectedTodoId(selectedTodoId);
    getUser(selectedUserId)
      .then((user) => {
        setUser(prev => ({
          ...prev,
          user,
          buttonClicked: true,
        }));
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
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="todo">
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': todo.completed === false,
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
                onClick={() => handleChangeUser(todo.userId, todo.id)}
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
