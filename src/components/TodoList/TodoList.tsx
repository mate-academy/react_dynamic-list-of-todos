import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setIsHide: (bool: boolean) => void;
  setSelectedTodo: (todo: Todo) => void,
  setIsLoading: (bool: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsHide,
  selectedTodo,
  setSelectedTodo,
  setIsLoading,
}: Props) => (
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
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                {todo.completed !== true
                  ? <p className="has-text-danger">{todo.title}</p>
                  : <p className="has-text-success">{todo.title}</p>}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    if (!todo) {
                      return;
                    }

                    setIsLoading(true);
                    setSelectedTodo(todo);
                    setIsHide(false);
                  }}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': todo.id !== selectedTodo?.id,
                      'fa-eye-slash': todo.id === selectedTodo?.id,
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

