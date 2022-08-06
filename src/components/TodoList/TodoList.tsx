import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  openedTodoId: number | null;
  filterOption: boolean | null;
  filterQuery: string;
  onClick: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todoList,
    openedTodoId,
    filterOption,
    filterQuery,
    onClick,
  },
) => {
  let visibleTodos = [...todoList];

  if (filterOption !== null) {
    visibleTodos = todoList.filter(todo => todo.completed === filterOption);
  }

  visibleTodos = visibleTodos.filter(todo => todo.title.includes(filterQuery));

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
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            className={
              openedTodoId === todo.id ? 'has-background-info-light' : ''
            }
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {
                todo.completed
                  ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )
                  : ''
              }
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
                onClick={() => onClick(todo)}
              >
                {openedTodoId === todo.id
                  ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  )
                  : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
