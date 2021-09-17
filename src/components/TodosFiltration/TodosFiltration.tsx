import React from 'react';

import './TodoFiltrarion.scss';

export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface Props {
  changeShowStatus: (value: Status) => void;
  searchByTitle: (value: string) => void;
  renderStatus: Status;
  query: string;
}

export const TodosFiltration: React.FC<Props> = (props) => {
  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const { value } = event.target;

    props.changeShowStatus(value as Status);
  };

  const handleSearchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    event.preventDefault();

    props.searchByTitle(value);
  };

  const { renderStatus, query } = props;

  return (
    <>
      <label htmlFor="searchByTitle">
        {'Search by title: '}
        <input
          className="Todos-filtration-field filter_field"
          type="text"
          value={query}
          id="searchByTitle"
          onChange={handleSearchByTitle}
        />
      </label>

      <label htmlFor="filterByStatus">
        {'Filter by status: '}
        <select
          className="Todos-filtration-field filter__field"
          name="filterByStatus"
          id="filterByStatus"
          value={renderStatus}
          onChange={handleChangeUser}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>
    </>
  );
};
