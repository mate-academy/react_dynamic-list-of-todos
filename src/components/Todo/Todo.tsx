import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { getUser } from '../../api';
import { TodoContext } from '../Todocontext/TodoContext';

type Props = {
  todo: Todo;
};

function findTodo(list: Todo[], id: number) {
  return list.find(item => item.id === id);
}

export const ToDo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;
  const {
    todosList,
    showUserDetails,
    setShowUserDetails,
    setSelectedTodo,
    setSelectedUser,
  } = useContext(TodoContext);

  const thisTodo = findTodo(todosList, id);

  const handleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
    getUser(userId).then(user => setSelectedUser(user));

    if (thisTodo) {
      setSelectedTodo(thisTodo);
    }
  };

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleUserDetails}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !showUserDetails,
                'fa-eye-slash': showUserDetails,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
