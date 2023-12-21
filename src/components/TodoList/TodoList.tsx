import React from 'react';
import { useTodo } from '../../providers/TodoProvider';

export const TodoList: React.FC = () => {
  const { visibleTodos, selectedTodo, handleSelectTodo } = useTodo();

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
        {visibleTodos.map(todo => {
          const isSelected = selectedTodo && todo.id === selectedTodo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={isSelected ? 'has-background-info-light' : ''}
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
                <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={handleSelectTodo(todo)}
                >
                  <span className="icon">
                    <i className={`far fa-eye${isSelected ? '-slash' : ''}`} />
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
