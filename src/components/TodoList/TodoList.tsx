import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  setIsModal: (value: boolean) => void;
  setUserId: (value: number) => void;
  setCurrentTodo: (todo: Todo) => void;
  status: Status;
  query: string;
  isModal: boolean;
  currentTodo?: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIsModal,
  setUserId,
  setCurrentTodo,
  status,
  query,
  isModal,
  currentTodo,
}) => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(todos);
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    switch (status) {
      case Status.all:
        setVisibleTodos(filteredTodos);
        break;

      case Status.active:
        setVisibleTodos(filteredTodos.filter(todo => !todo.completed));
        break;

      case Status.completed:
        setVisibleTodos(filteredTodos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(filteredTodos);
        break;
    }
  }, [filteredTodos, status]);

  useEffect(() => {
    setFilteredTodos(todos
      .filter((todo) => {
        const { title } = todo;
        const formattedTitle = title.toLowerCase();
        const formattedQuery = query.trim().toLowerCase();

        return formattedTitle.includes(formattedQuery);
      }));
  }, [query]);

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
        {visibleTodos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className=""
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
              <p
                className={classNames({
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
                onClick={() => {
                  setIsModal(true);
                  setUserId(todo.userId);
                  setCurrentTodo(todo);
                }}
              >
                <span className="icon">
                  {isModal && todo === currentTodo
                    ? (
                      <i className="far fa-eye-slash" />
                    )
                    : (
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
