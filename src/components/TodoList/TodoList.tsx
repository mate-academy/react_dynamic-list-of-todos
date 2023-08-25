import React, { useMemo } from 'react';
import { Todo, Filter } from '../../types/index';

type Props = {
  todos: Todo[] | null;
  handleTodoSelect: (todo: Todo) => void;
  query: string;
  selectedFilter: Filter;
  todoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodoSelect,
  query,
  selectedFilter,
  todoId,
}) => {
  const filteredTodos = useMemo(() => {
    const queryFilter = todos?.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    if (selectedFilter === Filter.all) {
      return queryFilter;
    }

    const isCompleted = selectedFilter === Filter.completed;

    return queryFilter?.filter(({ completed }) => completed === isCompleted);
  }, [query, selectedFilter, todos]);

  return (
    <>
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
          {filteredTodos?.map(todo => (
            <tr data-cy="todo" className="" key={todo.id}>
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
                  onClick={() => handleTodoSelect(todo)}
                >
                  <span className="icon">
                    <i className={todoId === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};
