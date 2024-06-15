import React, { useContext } from 'react';
import { TodoItemProp } from '../../types/Types';
import classNames from 'classnames';
import { UserIdContext, ActiveTodoContext } from '../../util/Store';

export const TodoItem: React.FC<TodoItemProp> = ({ todoItem }) => {
  const { setActiveUser } = useContext(UserIdContext);
  const { todo, setTodo } = useContext(ActiveTodoContext);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todoItem.id}</td>
      <td className="is-vcentered">
        {todoItem.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            todoItem.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todoItem.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            setActiveUser(`${todoItem.userId}`);
            setTodo(todoItem);
          }}
        >
          <span className="icon">
            {todo === todoItem ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
