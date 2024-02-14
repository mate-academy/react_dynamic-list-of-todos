import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { SortByAction } from '../../types/SortByAction';

type Props = {
  todos: Todo[];
  query: string;
  sortBy: SortByAction;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
};

function prepareList(
  todoList: Todo[],
  searchQuery: string,
  sortBy: SortByAction,
): Todo[] | [] {
  let copy = [...todoList];

  if (searchQuery) {
    copy = copy.filter((todo) => todo.title.toLowerCase()
      .includes(searchQuery.toLowerCase()));
  }

  switch (sortBy) {
    case SortByAction.Active:
      copy = copy.filter((todo) => !todo.completed);
      break;
    case SortByAction.Completed:
      copy = copy.filter((todo) => todo.completed);
      break;
    default:
      return copy;
  }

  return copy;
}

export const TodoList: React.FC<Props> = ({
  todos = [],
  query = '',
  sortBy = SortByAction.All,
  selectedTodo = null,
  setSelectedTodo = () => { },
}) => {
  const [todoListToShow, setTodoListToShow] = useState<Todo[]>(todos);

  useEffect(() => {
    const listToShow = prepareList(todos, query, sortBy);

    setTodoListToShow(listToShow);
  }, [query, todos, sortBy]);

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
        {todoListToShow.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': todo.id === selectedTodo?.id,
            })}
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
              <p className={cn({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  {todo.id === selectedTodo?.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
