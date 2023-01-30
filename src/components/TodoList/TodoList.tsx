import React, { memo } from 'react';
import classNames from 'classnames';
import { ListProps } from '../../types/ListProps';

export const TodoList: React.FC<ListProps> = memo(({
  todos,
  selectedTodoById,
  handleSelectTodo,
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
      {todos.map((todo) => (
        <tr
          key={todo.id}
          data-cy="todo"
          className=""
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
              className={classNames({
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
              onClick={() => handleSelectTodo(todo.id)}
            >
              <span className="icon">
                <i
                  className={classNames({
                    'far fa-eye-slash': selectedTodoById === todo.id,
                    'far fa-eye': selectedTodoById !== todo.id,
                  })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
));
