import React from 'react';
import { TodoFilterEnum } from '../../types/TodoFilterEnum';


type Props = {
  filter: TodoFilterEnum;
  setFilter: (filter: TodoFilterEnum) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}) => (

      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
              onChange={e => setFilter(e.target.value as TodoFilterEnum)}
            >
              <option value={TodoFilterEnum.All}>All</option>
              <option value={TodoFilterEnum.Active}>Active</option>
              <option value={TodoFilterEnum.Completed}>Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {searchQuery && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
        </p>
      </form>
);
