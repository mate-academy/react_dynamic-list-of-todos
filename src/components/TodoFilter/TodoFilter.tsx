import React from 'react';

// Props que o TodoFilter recebe do componente pai (App).
// Segue o padrão de "controlled component": o estado vive no pai,
// e o filho recebe valores + callbacks para reportar mudanças.
type Props = {
  // Texto atual no campo de busca
  query: string;
  // Status selecionado no dropdown: 'all' | 'active' | 'completed'
  filterStatus: string;
  // Callback chamado sempre que o texto de busca muda
  onQueryChange: (query: string) => void;
  // Callback chamado quando o status selecionado muda
  onFilterStatusChange: (status: string) => void;
};

// Componente de filtro — contém o dropdown de status e o campo de busca.
// É um "controlled component": não mantém estado próprio, apenas reflete
// os valores recebidos via props e notifica o pai de qualquer alteração.
export const TodoFilter: React.FC<Props> = ({
  query,
  filterStatus,
  onQueryChange,
  onFilterStatusChange,
}) => (
  <form className="field has-addons">
    {/* Dropdown para filtrar por status (all / active / completed) */}
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={event => onFilterStatusChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    {/* Campo de texto para buscar todos pelo título */}
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={event => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {/* Botão para limpar o campo de busca — só aparece quando há texto */}
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
