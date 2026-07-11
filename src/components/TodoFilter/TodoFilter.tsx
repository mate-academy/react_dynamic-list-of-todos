import React from 'react';

// Інтерфейс пропсів для фільтрації та пошуку
export interface TodoFilterProps {
  filter: string; // Поточне значення фільтра ('all', 'active', 'completed')
  setFilter: (filter: string) => void; // Функція для зміни значення фільтра
  search: string; // Поточний текст із поля пошуку
  setSearch: (search: string) => void; // Функція для зміни цього тексту
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event => setFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      {/* Контрольований інпут для пошуку */}
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* Кнопка очищення пошуку */}
        {search.length > 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
