import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
  setIsTodoSelected: (value: boolean) => void;
  isTodoSelected: boolean,
  setSelectedTodo: (value: Todo) => void,
  selectedTodo: Todo,
}

export const TodoList: React.FC<Props> = ({
  todos,
  setIsTodoSelected,
  isTodoSelected,
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
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
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
                onClick={() => {
                  setIsTodoSelected(!isTodoSelected);
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={cn('far',
                    {
                      'fa-eye': todo !== selectedTodo
                        || !isTodoSelected,
                    },
                    {
                      'fa-eye-slash': todo === selectedTodo
                      && isTodoSelected,
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
