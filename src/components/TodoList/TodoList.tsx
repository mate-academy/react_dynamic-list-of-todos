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
      case 'inprogress':
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
      <h2>Todos:</h2>

      <input
        type="text"
        value={search}
        placeholder="Try to find"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <select
        value={selected}
        onChange={(event) => {
          setSelected(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="inpropress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
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
