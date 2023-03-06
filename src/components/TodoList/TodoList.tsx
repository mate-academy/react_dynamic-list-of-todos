import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  selectedTodo: number | null;
  selectTodo: (todoId: number) => void;
  filter: string;
  search: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo: selectedTodoId,
  selectTodo,
  filter,
  search,
}) => {
  const todosForRender = todos
    .filter((todo: Todo) => {
      switch (filter) {
        case Filter.all:
          return todo;
        case Filter.completed:
          return todo.completed;
        case Filter.active:
          return !todo.completed;
        default:
          throw new Error('Something went wrong with the filtering');
      }
    })
    .filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    });

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
        {todosForRender.map(({ id, title, completed }: Todo) => {
          const color = completed ? 'success' : 'danger';

          return (
            <tr
              key={id}
              data-cy="todo"
              className=""
            >
              <td className="is-vcentered">
                {id}
              </td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}

              <td className="is-vcentered is-expanded">
                <p className={`has-text-${color}`}>
                  {title}
                </p>
              </td>
              {selectedTodoId === id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                </td>
              ) : (
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => selectTodo(id)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
