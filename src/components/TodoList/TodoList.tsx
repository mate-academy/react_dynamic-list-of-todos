import React from 'react';
import { Todo } from '../../types/Todo';

type ListOfTodos = {
  todoItems: Todo[],
  onSelectTodo(todId: number): void,
  onUserSelect(userId: number): void,
  selectedTodoId: number,
  filteringOptions: string
  currentQuery: string,
};

const filterTodos = (
  todos: Todo[],
  filteringOptions: string,
  query: string,
): Todo[] => {
  switch (filteringOptions) {
    case 'completed':
      return todos
        .filter(todo => todo.completed === true)
        .filter(todo => todo.title.includes(query));

    case 'active':
      return todos
        .filter(todo => todo.completed === false)
        .filter(todo => todo.title.includes(query));

    default:
      return todos.filter(todo => todo.title.includes(query));
  }
};

export const TodoList: React.FC<ListOfTodos> = ({
  todoItems,
  selectedTodoId,
  onSelectTodo,
  onUserSelect,
  filteringOptions,
  currentQuery,
}) => {
  const preparedTodos = filterTodos(
    todoItems,
    filteringOptions,
    currentQuery,
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
        {preparedTodos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.title}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                style={{ color: todo.completed === true ? 'green' : 'red' }}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === todo.id
                ? (
                  <button
                    data-cy="selectButton"
                    className="button is-link"
                    type="button"
                    onClick={() => onSelectTodo(0)}
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                )
                : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      onSelectTodo(todo.id);
                      onUserSelect(todo.userId);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
