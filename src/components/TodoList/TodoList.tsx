import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  query: string
  filterValue: string,
  setSelectedTodo: (todo: Todo) => void,
  selectedTodo: Todo,
};

export const TodoList: React.FC<Props> = ({
  todos,
  query,
  filterValue,
  setSelectedTodo,
  selectedTodo,
}) => {
  const findedTodos = todos.filter(todo => {
    let filterResult;

    switch (filterValue) {
      case Status.All:
        filterResult = true;
        break;
      case Status.Active:
        filterResult = todo.completed === false;
        break;
      case Status.Completed:
        filterResult = todo.completed === true;
        break;
      default:
        filterResult = true;
    }

    return (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
&& filterResult);
  });

  const openModalWindow = (todo: Todo) => {
    setSelectedTodo(todo);
  };

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
        {findedTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cn('', { 'has-background-info-light': false })}
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
                onClick={() => openModalWindow(todo)}
              >
                <span className="icon">
                  <i className={cn('far',
                    {
                      'fa-eye': selectedTodo.id !== todo.id,
                      'fa-eye-slash': selectedTodo.id === todo.id,
                    })}
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
