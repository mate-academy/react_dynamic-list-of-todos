import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
// import { Todo } from '../../types/Todo';

type Props = {
  allTodos:Todo[];
  setAllTodos: any;
};

export const TodoFilter: React.FC<Props> = ({ allTodos, setAllTodos }) => {
  const [option, setOption] = useState('All');
  const [query, setQuery] = useState('');

  const [filteredTodos, setFilteredTodos] = useState(allTodos);

  // const [todosToFilter, setTodosToFilter] = useState(allTodos);
  // const [filter, setFilter] = useState(allTodos);
  // const [filterCompletedTodos, setFilterCompletedTodos] = useState(allTodos);
  // const [filterNotCompletedTodos, setFilterNotCompletedTodos]
  // = useState(allTodos);

  const searchTitle = (input: string) => {
    const inputToLowercase = input.toLocaleLowerCase();

    const todos = allTodos.filter((todo: Todo) => (
      todo.title.toLocaleLowerCase().includes(inputToLowercase)
    ));

    setAllTodos(todos);
  };

  const handleClick = () => {
    setQuery('');
    // setAllTodos(allTodos);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);

    if (option === 'active') {
      setFilteredTodos(allTodos.filter(el => el.completed));
    } else if (option === 'completed') {
      setFilteredTodos(allTodos.filter(el => !el.completed));
    } else {
      setFilteredTodos(allTodos);
    }

    // if (option === 'active') {
    //   return setFilteredTodos(allTodos.filter(el => el.completed));
    // }

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
            value={option}
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
