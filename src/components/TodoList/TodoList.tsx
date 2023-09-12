import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Todo } from '../../types/Todo';
import { Select } from '../../types/Select';

function getFilteredTodoList(todos: Todo[], select: string, search: string) {
  const newTodos = [...todos];

  const updatedTodos = newTodos.filter(todo => todo.title.includes(search));

  switch (select) {
    case Select.Active: {
      return updatedTodos.filter(todo => todo.completed === false);
    }

    case Select.Completed: {
      return updatedTodos.filter(todo => todo.completed === true);
    }

    default:
      return updatedTodos;
  }
}

export const TodoList: React.FC = () => {
  const {
    todo,
    todosList,
    filterSelect,
    search,
    setTodo,
  } = useContext(TodoContext);
  const filteredTodoList = getFilteredTodoList(todosList, filterSelect, search);

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
        {filteredTodoList.map(({
          id,
          title,
          completed,
          userId,
        }) => (
          <tr data-cy="todo" className="" key={id}>
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setTodo({
                  id,
                  title,
                  completed,
                  userId,
                })}
              >
                <span className="icon">
                  <i
                    className={todo?.id === id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
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
