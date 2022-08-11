import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSetTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectFilter: string;
  searchFilter: string;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onSetTodo,
  selectFilter,
  searchFilter,
}) => {
  const prepareTodos = useMemo(() => {
    let newTodos = [...todos].filter(todo => {
      switch (selectFilter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    });

    if (searchFilter) {
      newTodos = newTodos.filter(todo => (
        todo.title.includes(searchFilter)
      ));
    }

    return newTodos;
  }, [searchFilter, selectFilter]);

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
        {prepareTodos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              {todo.completed ? (
                <p className="has-text-success">{todo.title}</p>
              ) : (
                <p className="has-text-danger">{todo.title}</p>
              )}
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSetTodo(todo);
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
});
