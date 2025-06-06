import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[];
  hasClicked: boolean;
  setHasClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: (user: User) => void;
  setChoosedItem: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  hasClicked,
  setHasClicked,
  setUser,
  setChoosedItem,
}) => {
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
        {todos.map(todo => {
          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered"></td>
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
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
                  onClick={() => {
                    setHasClicked((prev: boolean) => !prev);
                    setChoosedItem(todo);
                    getUser(todo.userId).then(setUser);
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far ${hasClicked ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
