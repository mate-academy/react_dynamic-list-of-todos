import React, { useState } from 'react';
import './TodoList.scss';
import { Todo } from '../Todo';

type Props = {
  todos: Todo[];
  changeUser: (userId: number) => void;
  selectedUserId: number,
};

enum FilterOptions {
  all,
  complited,
  uncomplited,
}

export const TodoList: React.FC<Props> = ({
  todos,
  changeUser,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.all);

  const visibleTodos = todos.filter((todo) => {
    const { title } = todo;

    return title.toLowerCase().includes(query);
  });

  const filteredTodos = visibleTodos.filter((todo) => {
    switch (filter) {
      case FilterOptions.complited: {
        return todo.completed === true;
      }

      case FilterOptions.uncomplited: {
        return todo.completed === false;
      }

      default:
        return todo;
    }
  });

  return (
    <div className="TodoList">
      <input
        type="text"
        id="search-query"
        className="TodoList__search"
        value={query}
        placeholder="Type search word"
        onChange={event => setQuery(event.target.value.toLowerCase())}
        data-cy="filterByTitle"
      />
      <select
        className="TodoList__select"
        onChange={(event) => setFilter(+event.target.value)}
      >
        <option
          value={FilterOptions.all}
        >
          Show all
        </option>
        <option
          value={FilterOptions.complited}
        >
          Show complited
        </option>
        <option
          value={FilterOptions.uncomplited}
        >
          Show uncomplited
        </option>
      </select>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              changeUser={changeUser}
              selectedUserId={selectedUserId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
