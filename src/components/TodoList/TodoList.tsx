import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodoId: Dispatch<SetStateAction<number | null>>;
  selectedTodoId: number | null;
};

export const TodoList: React.FC<Props> = props => {
  const { todos, selectTodoId, selectedTodoId } = props;

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
        {todos.length === 0 ? (
          <tr>
            <td colSpan={4}>No data</td>
          </tr>
        ) : (
          todos.map(todo => (
            <tr
              data-cy="todo"
              className={cn(
                todo.id === selectedTodoId && 'has-background-info-light',
              )}
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
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
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
                  onClick={() => selectTodoId(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={cn(
                        'far',
                        todo.id === selectedTodoId ? 'fa-eye-slash' : 'fa-eye',
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
