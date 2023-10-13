import React from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import {
  todoContext,
  DefaultValueType,
  ModalInfo,
} from '../../Contexts/Context';

type Props = {
  todo:Todo;
};

const TodoItem:React.FC<Props> = ({ todo }) => {
  const {
    currentItem,
    setVisibleItems,
    setCurrentItem,
  } = React.useContext(todoContext) as DefaultValueType;

  function handleClick() {
    const user = getUser(todo.userId);

    const currItem: ModalInfo = {
      user,
      todo,
      isVisible: true,
    };

    setCurrentItem(currItem);

    setVisibleItems(prev => {
      const newOnes = prev.filter(e => e.id !== todo.id);

      return [
        ...newOnes,
        todo,
      ].sort((a, b) => a.id - b.id);
    });
  }

  return (
    <tr
      data-cy="todo"
      className=""
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {
          todo.completed
            ? (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )
            : ''
        }
      </td>
      <td className="is-vcentered is-expanded">
        <p className={
          todo.completed
            ? 'has-text-success'
            : 'has-text-danger'
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
          onClick={() => handleClick()}
        >
          <span className="icon">
            <i className={
              currentItem.todo.id === todo.id && currentItem.isVisible
                ? 'far fa-eye-slash'
                : 'far fa-eye'
            }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export { TodoItem };
