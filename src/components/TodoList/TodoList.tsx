import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { Todo } from '../../types/Todo';
import { ActionType } from '../../types/Action';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useContext(DispatchContext);
  const { openedTodo, isModalOpened } = useContext(StateContext);

  const handleSelectButton = (todo: Todo) => {
    dispatch({ type: ActionType.setOpenedTodo, payload: todo });
    dispatch({ type: ActionType.setIsModalOpened, payload: true });
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
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': todo.id === openedTodo.id,
            })}
          >
            <td className="is-vcentered">
              {todo.id}
            </td>

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
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="selectButton"
                className="button"
                onClick={() => handleSelectButton(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': !isModalOpened,
                      'fa-eye-slash': isModalOpened,
                    })}
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
