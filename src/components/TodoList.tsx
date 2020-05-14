import React from 'react';
import { TodoItem } from './TodoItem';

interface Props {
  todos: PreparedTodos;
  handleSort: (todo: string) => void;
}

export const TodoList: React.FC<Props> = ({ todos, handleSort }) => {
  return (
    <>
      <div className="button-container">
        <button
          type="button"
          className="button"
          onClick={() => handleSort('name')}
        >
          Sort by name
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleSort('title')}
        >
          Sort by title
        </button>
        <button
          type="button"
          className="button"
          onClick={() => handleSort('completed')}
        >
          Sort by completed task
        </button>
      </div>
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id} className="list-item">
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
