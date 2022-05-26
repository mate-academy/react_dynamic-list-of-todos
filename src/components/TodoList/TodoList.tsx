import React, { useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  selectUser: ((id: number) => void),
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('all');

  const filtredTodos = () => {
    switch (selected) {
      case 'inpropress':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const visibleTodos = filtredTodos()
    .filter(todo => todo.title.includes(search));

  return (
    <div className="TodoList">
      <h2 className="TodoList__title">Todos:</h2>
      <div className="TodoList__filters">
        <input
          type="text"
          data-cy="filterByTitle"
          className="TodoList__search"
          value={search}
          placeholder="Try to find"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <select
          value={selected}
          className="TodoList__select"
          onChange={(event) => {
            setSelected(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="inpropress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectUser={selectUser}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
