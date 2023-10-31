import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setSelectedTodo: (val: Todo) => void
  selectedTodo: Todo | null
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
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
            className={cn(
              { 'has-background-info-light': selectedTodo?.id === todo.id },
            )}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed
              ? <td className="is-vcentered" />
              : (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )}
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
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
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  {selectedTodo?.id === todo.id
                    ? (<i className="far fa-eye-slash" />)
                    : (<i className="far fa-eye" />)}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
