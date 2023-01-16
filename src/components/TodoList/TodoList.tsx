import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoSelected: Todo | null,
  onSelectedTodo: (todoSelected: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoSelected,
  onSelectedTodo,
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
          className={
            classNames({ 'has-background-info-light': todoSelected })
          }
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
            <p className={classNames(todo.completed
              ? 'has-text-success'
              : 'has-text-danger')}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelectedTodo(todo)}
            >
              <span className="icon">
                <i className={
                  classNames(todoSelected?.id === todo.id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye')
                }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
