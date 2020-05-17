import React from 'react';
import { TodoItem } from './ToDo';

interface Props {
  todos: PreparedTodos;
  handleSort: (todo: string) => void;
}

export const TodoList: React.FC<Props> = ({ todos, handleSort }) => {
  return (
    <>

      <table className="data_table">
        <tr className="button-container">
          <td>
            <button
              type="button"
              className="button"
              onClick={() => handleSort('id')}
            >
              Sort by id
            </button>
          </td>

          <td>
            <button
              type="button"
              className="button"
              onClick={() => handleSort('title')}
            >
              Sort by title
            </button>
          </td>
          <td>
            <button
              type="button"
              className="button"
              onClick={() => handleSort('name')}
            >
              Sort by name
            </button>
          </td>
          <td>
            <button
              type="button"
              className="button"
              onClick={() => handleSort('completed')}
            >
              Sort by completed
            </button>
          </td>
        </tr>
        {todos.map(todo => (
          <tr key={todo.id} className="list-item">
            <TodoItem todo={todo} />
          </tr>
        ))}
      </table>
    </>
  );
};
