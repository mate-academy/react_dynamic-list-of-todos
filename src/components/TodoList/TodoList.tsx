import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

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

        {todos.map(todo => {
          const isSelectedTodo = todo.id === selectedTodo?.id;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelectedTodo,
              })}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className={cn({ 'fas fa-check': todo.completed })} />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded ">
                <p className={cn(
                  {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  },
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
                    onSelectTodo(todo);
                  }}
                >
                  <span className="icon">
                    <i className={cn({
                      'far fa-eye': !isSelectedTodo,
                      'far fa-eye-slash': isSelectedTodo,
                    })}
                    />
                    {' '}
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
