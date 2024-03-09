import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { CurrentTodo } from '../../types/CurrentTodo';
import { Visibility } from '../../types/Visibility';

interface Props {
  todos: Todo[];
  onOpen: (todoId: number) => void;
  isVisible: Visibility;
}

export const TodoList: React.FC<Props> = ({ todos, onOpen, isVisible }) => {
  const { setCurrent } = useContext(CurrentTodo);
  const handleVisible = (todo: Todo) => {
    setCurrent(todo);
    onOpen(todo.id);
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
        {todos.map((todo: Todo) => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i
                      className={cn('fas', {
                        'fa-check': todo.completed,
                      })}
                    />
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
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleVisible(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': isVisible.id !== todo.id,
                        'fa-eye-slash': isVisible.visible,
                      })}
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
