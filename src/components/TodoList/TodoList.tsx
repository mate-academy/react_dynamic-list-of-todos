import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodoId?: number;
  showSelectedTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  showSelectedTodo,
}) => (
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
          {todo.completed ? (
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
          ) : (
            <td className="is-vcentered" />
          )}

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
              onClick={() => showSelectedTodo(todo)}
            >
              <span className="icon">
                <i
                  className={classNames({
                    'far fa-eye-slash': selectedTodoId === todo.id,
                    'far fa-eye': selectedTodoId !== todo.id,
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
