import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = props => {
  const { todos, selectedTodo, setSelectedTodo } = props;

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
          const isTodoSelected = todo === selectedTodo;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                isTodoSelected ? 'has-background-info-light' : '',
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
                  className={classNames(
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
                  onClick={() => {
                    setSelectedTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        isTodoSelected ? 'fa-eye-slash' : 'fa-eye',
                      )}
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
