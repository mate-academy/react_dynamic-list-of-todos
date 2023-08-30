import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectTodo,
  selectedTodo,
}) => {
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
            data-cy="todo"
            key={todo.id}
            className={cn({
              'has-background-info-light': todo.id === selectedTodo?.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
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
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': todo.id !== selectedTodo?.id,
                      'fa-eye-slash': todo.id === selectedTodo?.id,
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
};

// <tr
//  data-cy="todo"
//  className="has-background-info-light"
// >
//  <td className="is-vcentered">2</td>
//  <td className="is-vcentered" />
//  <td className="is-vcentered is-expanded">
//    <p className="has-text-danger">quis ut nam facilis et officia qui</p>
//  </td>
//  <td className="has-text-right is-vcentered">
//    <button
//      data-cy="selectButton"
//      className="button"
//      type="button"
//    >
//      <span className="icon">
//        <i className="far fa-eye-slash" />
//      </span>
//    </button>
//  </td>
// </tr>
