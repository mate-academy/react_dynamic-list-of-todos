import React, { memo, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { FilterByCompleted } from '../../types/FilterByCompleted';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  titleFilter: string,
  completedFilter: FilterByCompleted,
  onTodoSelect: (selectedTodo: Todo) => void,
};

function filterTodos(
  todos: Todo[],
  titleFilter: string,
  completedFilter: FilterByCompleted,
) {
  const filteredByTitle = todos
    .filter(todo => todo.title.trim().toLowerCase()
      .includes(titleFilter.trim().toLowerCase()));

  if (filteredByTitle.length === 0) {
    return filteredByTitle;
  }

  switch (completedFilter) {
    case FilterByCompleted.Active:
      return filteredByTitle.filter(todo => !todo.completed);
    case FilterByCompleted.Completed:
      return filteredByTitle.filter(todo => todo.completed);
    default:
      return filteredByTitle;
  }
}

export const TodoList: React.FC<Props> = memo(({
  todos,
  titleFilter,
  completedFilter,
  onTodoSelect,
  selectedTodo,
}) => {
  const filteredTodos = useMemo(
    () => filterTodos(todos, titleFilter, completedFilter),
    [todos, titleFilter, completedFilter],
  );

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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
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
                onClick={() => onTodoSelect(todo)}
              >
                {selectedTodo?.id !== todo.id ? (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
