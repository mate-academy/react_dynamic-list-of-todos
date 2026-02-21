import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  query: string;
  filter: string;
  listLoader: boolean;
  selectedId: number | null;
  onSelectedId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  query,
  filter,
  listLoader,
  selectedId,
  onSelectedId,
}) => {
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  const visibleGoods = useMemo(() => {
    return todos.filter(todo => {
      if (todo.completed && filter === 'active') {
        return false;
      } else if (!todo.completed && filter === 'completed') {
        return false;
      }

      return todo.title.toLowerCase().includes(query);
    });
  }, [todos, query, filter]);

  useEffect(() => {
    if (isFirstLoading) {
      setIsFirstLoading(false);
    }
  }, [todos, selectedId, query, filter, isFirstLoading]);

  return (
    <>
      {!listLoader && (
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
            {visibleGoods.map(todo => (
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
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                  >
                    <span className="icon">
                      <i
                        className={classNames({
                          far: true,
                          'fa-eye-slash': selectedId === todo.id,
                          'fa-eye': selectedId !== todo.id,
                        })}
                        onClick={() => {
                          onSelectedId(todo.id);
                        }}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
