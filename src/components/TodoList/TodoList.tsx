import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

function getFilteredTodos(
  todos: Todo[],
  option: string,
  query: string,
): Todo[] {
  const filteredTodos = !query
    ? [...todos]
    : [...todos].filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );

  switch (option) {
    case 'all':
      return filteredTodos;
    case 'active':
      return filteredTodos.filter(todo => todo.completed === false);
    case 'completed':
      return filteredTodos.filter(todo => todo.completed === true);
    default:
      return filteredTodos;
  }
}

type Props = {
  todos: Todo[];
  filterOption: string;
  filterQuery: string;
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  todoId: number | null;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  filterOption,
  filterQuery,
  onSelectTodo,
  todoId,
}) => {
  const preparedTodos = getFilteredTodos(todos, filterOption, filterQuery);

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
        {preparedTodos.map((todo, index) => {
          const { id, completed, title } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              {completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : (
                  <td className="is-vcentered" />
                )}
              <td className="is-vcentered is-expanded">
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span
                    className="icon"
                    role="button"
                    tabIndex={index}
                    onClick={() => onSelectTodo(todo)}
                    onKeyUp={() => {}}
                  >
                    <i className={classNames(
                      'far',
                      { 'fa-eye': todoId !== id},
                      { 'fa-eye-slash': todoId === id },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
