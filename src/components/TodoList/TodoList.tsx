import React, { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo?: Todo;
  onSelectedTodoIdChange: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoList: React.FC<Props> = memo((props) => {
  const {
    todos,
    selectedTodo,
    onSelectedTodoIdChange,
  } = props;

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
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={cn(
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
                onClick={() => (
                  selectedTodo?.id === todo.id
                    ? onSelectedTodoIdChange(0)
                    : onSelectedTodoIdChange(todo.id)
                )}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      { 'fa-eye': selectedTodo?.id !== todo.id },
                      { 'fa-eye-slash': selectedTodo?.id === todo.id },
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
