import React from 'react';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}> = ({ todos, selectedTodo, setSelectedTodo }) => {
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
        {todos.map(({ completed, id, title, userId }) => (
          <tr key={id} data-cy="todo" className="">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && <i className="fas fa-check" />}
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
                  setSelectedTodo({ completed, id, title, userId });
                }}
              >
                <span
                  className="icon"
                  data-cy={completed ? 'iconCompleted' : ''}
                >
                  <i
                    className={`far fa-eye${selectedTodo?.id === id ? '-slash' : ''}`}
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
