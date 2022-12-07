import { Dispatch, SetStateAction } from 'react';

type Props = {
  onQueryChange: Dispatch<SetStateAction<string>>;
  updateSelectedItems: (event: any) => void;
  query: string;
  selectedOption: number;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    query,
    selectedOption,
    onQueryChange,
    updateSelectedItems,
  } = props;

  const questionTags = [
    { label: 'All', value: 0 },
    { label: 'Active', value: 1 },
    { label: 'Completed', value: 2 },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={event => updateSelectedItems(event)}
          >
            {questionTags.map(tag => (
              <option
                key={tag.value}
                value={tag.value}
              >
                {tag.label}
              </option>
            ))}
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
          onChange={event => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
