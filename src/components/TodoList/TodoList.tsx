import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

interface Props {
  isLoaded: boolean,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentUserId: React.Dispatch<React.SetStateAction<number>>,
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo>>,
  filterCallback: (todo: Todo) => boolean,
}

export const TodoList: React.FC<Props> = ({
  isLoaded,
  setIsLoaded,
  setCurrentUserId,
  setCurrentTodo,
  filterCallback,
}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todos => setVisibleTodos(todos));
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
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
            {visibleTodos.filter(filterCallback).map(visibleTodo => (
              <tr
                data-cy="todo"
                className="has-background-info-light"
                key={visibleTodo.id}
              >
                <td className="is-vcentered">{visibleTodo.id}</td>
                <td className="is-vcentered">
                  {visibleTodo.completed
                    ? (<i className="fas fa-check" />) : ''}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-danger': !visibleTodo.completed,
                      'has-text-success': visibleTodo.completed,
                    })}
                  >
                    {visibleTodo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      setCurrentUserId(visibleTodo.userId);
                      setCurrentTodo(visibleTodo);
                    }}
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
      )}
    </>
  );
};
