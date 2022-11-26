import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
// import { Todo } from '../../types/Todo';

type Props = {
  allTodos:Todo[];
  setFilterTodos: any;
};

export const TodoFilter: React.FC<Props> = ({ allTodos, setFilterTodos }) => {
  const [selection, setSelection] = useState('');
  const [query, setQuery] = useState('');
  // const [filteredTodos, setFilteredTodos] = useState(allTodos);

  const searchTitle = (input: string) => {
    const inputToLowercase = input.toLocaleLowerCase();

    const todos = allTodos.filter((todo: Todo) => (
      todo.title.toLocaleLowerCase().includes(inputToLowercase)
    ));

    setFilterTodos(todos);
  };

  const handleClick = () => {
    setQuery('');
    setFilterTodos(allTodos);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(event.target.value);

    let result = allTodos;

    if (event.target.value === 'all') {
      result = allTodos;
    } else if (event.target.value === 'active') {
      result = allTodos.filter(todo => !todo.completed);
    } else {
      result = allTodos.filter(todo => todo.completed);
    }

    setFilterTodos(result);

    // switch (option) {
    //   case 'all':
    //     return setFilteredTodos(allTodos);

    //   case 'active':
    //     return setFilteredTodos(allTodos.filter(el => el.completed));

    //   case 'completed':
    //     return setFilteredTodos(allTodos.filter(el => !el.completed));

    //   default:
    //     break;
    // }

    // return filteredTodos;
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selection}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            searchTitle(query);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClick}
          />
        </span>
      </p>
    </form>
  );
};

// 1. find all completed
// 2. find all not completed

//   if (value === all) {
//     return setAllTodos([])
//   } else if (value === active) {
//     return 1
//   } else {
//     return 2
//   }

// switch (key) {
//   case value === all:
//     return setAllTodos(allTodos);

//   case value === active:
//     return setAllTodos(allTodos.completed !== true);

//   case value === completed:
//     return setAllTodos(allTodos.completed === true );

//   default:
//     break;
// }

// const [todosToFilter, setTodosToFilter] = useState(allTodos);
// const [filter, setFilter] = useState(allTodos);
// const [filterCompletedTodos, setFilterCompletedTodos] = useState(allTodos);
// const [filterNotCompletedTodos, setFilterNotCompletedTodos]
// = useState(allTodos);
