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

function searchIncludings(str: string, subStr: string): boolean {
  return str.toLowerCase().includes(subStr.toLowerCase());
}

const filterTodos = (
  todos: Todo[],
  filteringOptions: string,
  query: string,
): Todo[] => {
  switch (filteringOptions) {
    case 'completed':
      return todos
        .filter(todo => todo.completed === true)
        .filter(todo => searchIncludings(todo.title, query));

    case 'active':
      return todos
        .filter(todo => todo.completed === false)
        .filter(todo => searchIncludings(todo.title, query));

    default:
      return todos
        .filter(todo => searchIncludings(todo.title, query));
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
        {preparedTodos.map((todo) => {
          const completionStatus = todo.completed;
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr
              data-cy="todo"
              className={`${isSelected ? 'has-background-info-light' : ''}`}
              key={todo.title}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {completionStatus && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  style={{ color: completionStatus ? 'green' : 'red' }}
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
          );
        })}
      </tbody>
    </table>
  );
};
