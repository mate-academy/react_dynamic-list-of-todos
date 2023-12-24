import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const { selectedTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const selectNewTodo = (newTodo: Todo) => {
    dispatch({ type: 'selectNew', todo: newTodo });
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': todo.id === selectedTodo?.id,
      })}
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
          className={cn({
            'has-text-danger': !todo.completed,
          }, {
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td className="has-text-right is-vcentered">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            selectNewTodo(todo);
          }}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye-slash': todo.id === selectedTodo?.id,
              'fa-eye': todo.id !== selectedTodo?.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
