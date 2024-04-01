import React from 'react';
import { Select } from '../../types/otherTypes';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Select;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onSelect,
}) => {
  return (
    <>
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
          {todos.map((todo, index) => (
            <tr
              key={index}
              data-cy="todo"
              className={
                selectedTodo && todo.id === selectedTodo.id
                  ? 'has-background-info-light'
                  : ''
              }
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : null}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo)}
                >
                  {' '}
                  <span className="icon">
                    {selectedTodo && todo.id === selectedTodo.id ? (
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
    </>
  );
};
