import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";
import { StatusFilter } from "../../types/StatusFilter";

type Props = {
  selectStatus: StatusFilter;
  setSelectStatus: Dispatch<SetStateAction<StatusFilter>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  setSelectStatus,
  setQuery,
  query
}) => {

  const handleChangeSelectValue = async (event: ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    if(value !== selectStatus) {
      setSelectStatus(value as StatusFilter);
    }
  }

  const handleChangeQuery = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const {value} = event.target;
    setQuery(value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleClearInput = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuery('');
  }
  
  return(
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeSelectValue}>
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
          onChange={handleChangeQuery}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button data-cy="clearSearchButton" type="button" className="delete" onClick={handleClearInput} />
        </span>
      </p>
    </form>
);
}