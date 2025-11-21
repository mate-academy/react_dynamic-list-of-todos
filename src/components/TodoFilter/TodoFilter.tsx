import React from 'react';
import { useTodoContext } from '../../context/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter, searchQuery, setSearchQuery } = useTodoContext();

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ minWidth: 180 }}>
        <div className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e =>
              setFilter(e.target.value as 'all' | 'active' | 'completed')
            }
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>

      <div className="field" style={{ flex: 1 }}>
        <div className="control has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="button"
              onClick={() => setSearchQuery('')}
              style={{ marginLeft: 8 }}
            >
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
