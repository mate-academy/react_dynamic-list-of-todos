import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[]
  selectedId: number,
  selectTodoId: (todoId: number) => void,
  selectTodo: (todo: Todo) => void,
}

export const TodoList: React.FC<TodoListProps> = ({
  todos, selectedId, selectTodoId, selectTodo,
}) => {
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
        {todos.map(todo => {
          const {
            id, title, completed,
          } = todo;

          const isSelected = id === selectedId;

          return (
            <tr
              data-cy="todo"
              className={isSelected ? 'has-background-info-light' : ''}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    selectTodoId(id);
                    selectTodo(todo);
                  }}
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
