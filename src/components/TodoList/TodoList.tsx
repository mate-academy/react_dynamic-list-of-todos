import { FC } from 'react';
import { Filter } from '../../helpers/constants';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  selectTodo: (todoId: number) => void,
  selectedTodo: number,
  search: string,
};

export const TodoList: FC<Props> = ({
  todos,
  filter,
  selectTodo,
  selectedTodo: selectedTodoId,
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
          throw new Error('Error during filtering');
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
              <td className="is-vcentered">{id}</td>
              {completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : (
                  <td className="is-vcentered" />
                )}
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${color}`}>
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {selectedTodoId === id
                  ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  )
                  : (
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
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
