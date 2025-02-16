import cn from 'classnames';
import React, { SetStateAction, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setUpdatedTodos: (params: Todo[]) => void;
  updatedTodos: Todo[];
  todos: Todo[];
  setSelectedTodo: React.Dispatch<SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
  filter: string;
  query: string;
};

export const TodoList: React.FC<Props> = ({
  setUpdatedTodos,
  updatedTodos,
  todos,
  filter,
  selectedTodo,
  setSelectedTodo,
  query,
}) => {
  useEffect(() => {
    let filteredTodos = [...todos];

    switch (filter) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setUpdatedTodos(filteredTodos);
  }, [filter, todos, setUpdatedTodos, query]);

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
        {updatedTodos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
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
                  {selectedTodo === todo ? (
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
