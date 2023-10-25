import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  listOfTodos: Todo[],
  selectedTodo: Todo | null,
  selectTodo: (todo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  listOfTodos,
  selectedTodo,
  selectTodo,
}) => {
  const handlerClickTodo = (todo: Todo) => {
    return (
      selectedTodo && selectedTodo.id === todo.id
        ? selectTodo(null)
        : selectTodo(todo)
    );
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
        {listOfTodos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo
               && selectedTodo.id === todo.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td
              className="is-vcentered"
            >
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
                onClick={() => handlerClickTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames({
                    'far fa-eye-slash': selectedTodo
                     && selectedTodo.id === todo.id,
                    'far fa-eye': !selectedTodo || selectedTodo.id !== todo.id,
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
