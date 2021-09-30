import React from 'react';
import './TodoFilter.scss';

enum Status {
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

export const TodoFilter: React.FC<Props> = (props) => {
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
        Search by title:
        <input
          className="filter__input"
          type="text"
          value={query}
          id="searchByTitle"
          onChange={handleSearchByTitle}
        />
      </label>

      <label htmlFor="searchByStatus">
        Search by status:
        <select
          className="filter__input"
          name="searchByStatus"
          id="searchByStatus"
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
