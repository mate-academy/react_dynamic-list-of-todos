import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShow: (userNum: number) => void;
  filterBy: Filter;
  searchBy: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShow,
  filterBy,
  searchBy,
}) => {
  const filterTodo = () => {
    let visibleTodos = [...todos];

    const searchByStr = (title: string) => {
      return title.toLowerCase().includes(searchBy.toLowerCase());
    };

    switch (filterBy) {
      case Filter.Active:
        visibleTodos = todos.filter(visible => !visible.completed
          && searchByStr(visible.title));
        break;
      case Filter.Completed:
        visibleTodos = todos.filter(visible => visible.completed
          && searchByStr(visible.title));
        break;
      case Filter.All:
        visibleTodos = todos.filter(visible => searchByStr(visible.title));
        break;
      default:
        break;
    }

    return visibleTodos;
  };

  const visibleTodos = filterTodo();

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
              <p className={todo.completed ? (
                'has-text-success'
              ) : (
                'has-text-danger'
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
                onClick={() => {
                  onShow(todo.id);
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
  );
};
