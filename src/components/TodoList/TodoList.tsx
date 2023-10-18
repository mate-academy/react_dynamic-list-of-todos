import React from 'react';
import { Todo } from '../../types/Todo';
// import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
  setSelectedUserId,
}) => {
  const handleButtonClick = (id: number, userId: number) => {
    setSelectedTodoId(prevId => (prevId === id ? null : id));
    setSelectedUserId(userId);
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
            className={
              selectedTodoId === todo.id
                ? 'has-background-info-light'
                : ''
            }
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
                onClick={() => handleButtonClick(todo.id, todo.userId)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodoId === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
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
