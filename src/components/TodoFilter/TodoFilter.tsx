import React, { useEffect, useState, useMemo } from 'react';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../services/api';

export const TodoFilter: React.FC = () => {
  const [searchUserInput, setSerarchUserInput] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [allTodos, setAllTodos] = useState([] as Todo[]);
  const [loadingListState, setLoadingState] = useState(true);

  const completedTodos = useMemo(() => {
    return allTodos.filter(element => element.completed);
  }, [allTodos]);

  const activeTodos = useMemo(() => {
    return allTodos.filter(element => !element.completed);
  }, [allTodos]);

  const reducer = (action: { query: string; criteria: string }) => {
    const { query, criteria } = action;

    if (criteria === 'completed') {
      return completedTodos.filter(element =>
        element.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    if (criteria === 'active') {
      return activeTodos.filter(element =>
        element.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    return allTodos.filter(element =>
      element.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  };

  const [currentList, setCurrentList] = useState(allTodos);

  const handleClickDeleteButton = () => {
    setCurrentList(reducer({ query: '', criteria: filterCriteria }));
    setSerarchUserInput('');
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setAllTodos(todosFromServer))
      .finally(() => setLoadingState(false));
  }, []);

  useEffect(() => {
    setCurrentList(
      reducer({ query: searchUserInput, criteria: filterCriteria }),
    );
  }, [searchUserInput, filterCriteria, allTodos]);

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={event => setFilterCriteria(event.target.value)}
              value={filterCriteria}
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
            value={searchUserInput}
            onChange={event =>
              setSerarchUserInput(event.target.value.toLowerCase())
            }
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {searchUserInput !== '' && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClickDeleteButton}
              />
            )}
          </span>
        </p>
      </form>

      <TodoList currentList={currentList} loadingListState={loadingListState} />
    </>
  );
};
