import React, { useState } from 'react';
import './TodoList.scss';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  onSelect: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(0);

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase()
      .includes(query.toLowerCase())
  ));

  switch (filter) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  const selectIdHandler = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Filter by title"
        data-cy="filterByTitle"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Not Completed</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map(todo => (
            <TodoInfo
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              title={todo.title}
              userId={todo.userId}
              onSelect={onSelect}
              selectedId={selectedId}
              onSelectId={selectIdHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
