import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/filter';

type Props = {
  todos: Todo[];
  handleSelectTodo: (todo: Todo) => void;
  filter: Filter;
  textFilter: string,
};

export const TodoList: React.FC<Props>
= ({
  todos, handleSelectTodo, filter, textFilter,
}) => {
  const filterTodos = (t0d0s: Todo[],
    filterBy: Filter,
    titleFilter: string) => {
    let filteredTodos = t0d0s;

    if (titleFilter) {
      filteredTodos = t0d0s.filter(todo => todo.title.includes(titleFilter));
    }

    switch (filterBy) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);

        break;
      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;
      default:
      case 'all':
    }

    return filteredTodos;
  };

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
        {filterTodos(todos, filter, textFilter).map((todo) => (
          <tr key={todo.id} data-cy="todo" className="">
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
                ? 'has-text-success' : 'has-text-danger'}
              >
                {todo.title}

              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};
