import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { SortBy } from '../../types/SortBy';

type ListOfTodos = {
  listOfTodos: Todo[],
  onSelect: (todo: Todo) => void;
  // sortBy: SortBy,
  // query: string,
};

export const TodoList: React.FC<ListOfTodos> = ({
  listOfTodos,
  onSelect,
  // sortBy,
  // query,
}) => {
  // let visibleListOfTodos = listOfTodos.filter(el => el.title.includes(query));

  // switch (sortBy) {
  //   case SortBy.active:
  //     visibleListOfTodos = visibleListOfTodos.filter(
  //       el => el.completed === false,
  //     );
  //     break;

  //   case SortBy.completed:
  //     visibleListOfTodos = visibleListOfTodos.filter(
  //       el => el.completed === true,
  //     );
  //     break;

  //   default:
  //     break;
  // }

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
        {listOfTodos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
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
                onClick={() => onSelect(todo)}
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
