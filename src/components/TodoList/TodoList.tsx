import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todoList: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  selectedTodo,
  setSelectedTodo,
}: Props) => {
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
        {todoList.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
            key={todo.id}
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
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far ',
                      selectedTodo?.id !== todo.id
                        ? 'far fa-eye'
                        : 'fa-eye-slash',
                    )}
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
