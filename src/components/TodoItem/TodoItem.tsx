/* eslint-disable no-console */

import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useContext } from 'react';
import { getTodo, getUser } from '../../api';
import { TodoContext } from '../TodoContext/TodoContext';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  // eslint-disable-next-line max-len
  const { selectedTodo, setSelectedTodo, setIsModalLoading, setSelectedUser } =
    useContext(TodoContext);

  const handleButton = (todoItem: Todo) => {
    setIsModalLoading(true);

    getTodo(todoItem.id).then(item => {
      if (item) {
        setSelectedTodo(item);
        getUser(item.userId)
          .then(user => setSelectedUser(user))
          .finally(() => {
            setIsModalLoading(false);
          });
      } else {
        setIsModalLoading(false);
      }
    });
  };

  return (
    <tr data-cy="todo" className="">
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
        <p
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
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
          onClick={() => handleButton(todo)}
        >
          <span className="icon">
            <i
              className={cn({
                'far fa-eye': selectedTodo?.id !== todo.id,
                'far fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

{
  /* <tr data-cy="todo" className="has-background-info-light">
  <td className="is-vcentered">2</td>
  <td className="is-vcentered" />
  <td className="is-vcentered is-expanded">
    <p className="has-text-danger">quis ut nam facilis et officia qui</p>
  </td>
  <td className="has-text-right is-vcentered">
    <button data-cy="selectButton" className="button" type="button">
      <span className="icon">
        <i className="far fa-eye-slash" />
      </span>
    </button>
  </td>
  </tr> */
}

// <tr data-cy="todo" className="">
// <td className="is-vcentered">8</td>
// <td className="is-vcentered">
//   <span className="icon" data-cy="iconCompleted">
//     <i className="fas fa-check" />
//   </span>
// </td>
// <td className="is-vcentered is-expanded">
//   <p className="has-text-success">quo adipisci enim quam ut ab</p>
// </td>
// <td className="has-text-right is-vcentered">
//   <button data-cy="selectButton" className="button" type="button">
//     <span className="icon">
//       <i className="far fa-eye" />
//     </span>
//   </button>
// </td>
// </tr>
