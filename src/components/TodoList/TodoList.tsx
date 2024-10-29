import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  showSelectedTodo: (todo: Todo) => void;
  selectedStatus: Status;
  query: string;
  selectedTodo: Todo | null;
};

const getPrepareList = (todos: Todo[], status: Status, query: string) => {
  let prepareList = todos;

  switch (status) {
    case Status.ACTIVE:
      prepareList = prepareList.filter(todo => !todo.completed);
      break;

    case Status.COMPLETED:
      prepareList = prepareList.filter(todo => todo.completed);
      break;

    case Status.ALL:
    default:
      break;
  }

  if (query) {
    prepareList = prepareList.filter(todo =>
      todo.title
        .toLocaleLowerCase()
        .trim()
        .includes(query.toLocaleLowerCase().trim()),
    );
  }

  return prepareList;
};

export const TodoList: React.FC<Props> = ({
  query,
  selectedStatus,
  selectedTodo,
  showSelectedTodo,
  todos,
}: Props) => {
  const filterList = getPrepareList(todos, selectedStatus, query);

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
        {filterList.map(todo => (
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
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
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
                onClick={() => showSelectedTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye',
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
};
