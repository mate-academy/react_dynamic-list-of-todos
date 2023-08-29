import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../enum/enum';

type Props = {
  todos: Todo[],
  selectedFilter: string,
  inputValue: string,
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo?: Todo,
};

function filteredTodos(
  todos: Todo[],
  selectedFilter: string,
  inputValue: string,
): Todo[] {
  return todos.filter(todo => {
    const lowerCaseTitle = todo.title.toLowerCase();

    if (
      (selectedFilter === Filter.Active && todo.completed)
      || (selectedFilter === Filter.Completed && !todo.completed)
    ) {
      return false;
    }

    if (inputValue && !lowerCaseTitle.includes(inputValue.toLowerCase())) {
      return false;
    }

    return true;
  });
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedFilter,
  inputValue,
  setSelectedTodo,
  selectedTodo,
}) => {
  const updatedTodos = filteredTodos(todos, selectedFilter, inputValue);

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
        {updatedTodos.map(todo => {
          const todoIsSelect = todo.id === selectedTodo?.id;

          return (
            <tr
              data-cy="todo"
              className={todoIsSelect ? 'has-background-info-light' : ''}
              key={todo.id}
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  title="Select todo"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i className={todoIsSelect
                      ? 'far fa-eye-slash' : 'far fa-eye'}
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
