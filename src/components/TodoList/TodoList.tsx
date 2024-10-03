import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Options';

interface Props {
  todos: Todo[];
  showSelectedTodo: (todo: Todo) => void;
  selectedOption: Filter;
  query: string;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  showSelectedTodo,
  selectedOption,
  query,
  selectedTodo,
}) => {
  function filterList(
    todosToFilter: Todo[],
    option: Filter,
    filterQuery: string,
  ) {
    let filteredTodos = todosToFilter;

    switch (option) {
      case Filter.active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case Filter.completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case Filter.all:
      default:
        break;
    }

    if (filterQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }

  const filteredList = filterList(todos, selectedOption, query);

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
        {filteredList?.map(todo => (
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
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => showSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
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
