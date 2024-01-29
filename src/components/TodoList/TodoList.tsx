import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  setSelectedTodo: (value: Todo) => void;
  filter: string,
  query: string,
};

function filteredTodos(
  todos: Todo[],
  filter: string,
  query: string,
): Todo[] {
  return todos.filter(todo => {
    const lowerCaseTitle = todo.title.toLowerCase();

    const isActiveAndCompleted = filter === Status.Active
      && todo.completed;
    const isCompletedAndNotCompleted = filter === Status.Completed
      && !todo.completed;

    if (isActiveAndCompleted || isCompletedAndNotCompleted) {
      return false;
    }

    return !(query
      && !lowerCaseTitle.includes(query.toLowerCase()));
  });
}

export const TodoList: React.FC<Props> = ({
  todos, selectedTodo, setSelectedTodo, filter, query,
}) => {
  const updatedTodos = filteredTodos(todos, filter, query);

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
        {updatedTodos.map(currentTodo => {
          const todoIsSelect = currentTodo.id === selectedTodo?.id;

          return (
            <tr
              data-cy="todo"
              key={currentTodo.id}
              className={classNames({
                'has-background-info-light':
                  todoIsSelect,
              })}
            >
              <td className="is-vcentered">{currentTodo.id}</td>
              {currentTodo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">

                <p
                  className={currentTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {currentTodo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(currentTodo)}
                >
                  <span className="icon">
                    <i className={classNames({
                      'far fa-eye-slash': todoIsSelect,
                      'far fa-eye': !todoIsSelect,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
