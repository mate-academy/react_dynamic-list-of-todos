import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  tasks: Todo[];
  onShowTodoDetail: (todo: Todo) => void;
  selectedTask: Todo | null;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    tasks: todos,
    onShowTodoDetail: onShowTotoDetail,
    selectedTask: activeTodo,
  }) => {
    const showTodoDetail = (todo: Todo) => {
      onShowTotoDetail(todo);
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
          {todos.map(todo => {
            return (
              <tr data-cy="todo" className="" key={todo.id}>
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
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    onClick={() => showTodoDetail(todo)}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': activeTodo?.id !== todo.id,
                          'fa-eye-slash': activeTodo?.id === todo.id,
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
  },
);

TodoList.displayName = 'TodoList';
