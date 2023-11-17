import { ChangeEvent, FormEvent, useState } from "react";
import { FilterQuery, Status } from "../../App";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<FilterQuery>>,
};

export const TodoFilter: React.FC<Props> = ({ setQuery }) => {
  const [searched, setSearched] = useState('');
  const [statusSelected, setStatusSelected] = useState<Status>(Status.All);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPattern = event.target.value;
    setSearched(newPattern);
    setQuery((prevFilterQuery) => ({
      ...prevFilterQuery,
      pattern: newPattern,
    }));
  };


  const handleSelect = (status: string) => {
    let selectedStatus: Status;

    switch (status) {
      case 'all':
        selectedStatus = Status.All;
        break;
      case 'active':
        selectedStatus = Status.Active;
        break;
      case 'completed':
        selectedStatus = Status.Completed;
        break;
      default:
        selectedStatus = Status.All;
    }

    setStatusSelected(selectedStatus);
    setQuery((prevFilterQuery) => ({
      ...prevFilterQuery,
      status: selectedStatus,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleDelete = () => {
    setSearched('');
    setQuery({ pattern: '', status: statusSelected });
  }

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={(e) => handleSelect(e.target.value)}>
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
          value={searched}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searched.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
}
