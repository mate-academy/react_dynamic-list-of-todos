import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number | null,
  onSelectedTodo: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(
  (props) => {
    const { todos, selectedTodoId, onSelectedTodo } = props;

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
              className={classNames({
                'has-background-info-light': selectedTodoId === todo.id,
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
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>

              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectedTodo(todo.id)}
                >
                  <span className="icon">
                    <i className={todo.id === selectedTodoId
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
