import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[]; // expects already-filtered list (and from API we only loaded 5)
  onSelect: (todo: Todo) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onSelect,
  selectedTodoId,
}) => {
  return (
    // eslint-disable-next-line max-len
    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Completed</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({ 'has-background-success-light': todo.completed })}
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
                  type="button"
                  className="button"
                  data-cy="selectButton"
                  onClick={() => onSelect(todo)}
                >
                  <span className="icon" style={{ marginRight: 6 }}>
                    <i
                      className={cn({
                        'far fa-eye-slash': isSelected,
                        'far fa-eye': !isSelected,
                      })}
                    />
                  </span>
                  {/* тестам зазвичай зручніше бачити текст Show/Hide */}
                  <span data-cy={`selectButtonText-${todo.id}`}>
                    {isSelected ? 'Hide' : 'Show'}
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
