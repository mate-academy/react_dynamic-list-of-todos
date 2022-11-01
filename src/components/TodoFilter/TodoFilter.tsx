import {
  FC,
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useCallback,
  memo,
} from 'react';
import { SelectOptions } from '../../types/SelectOptions';
import { debounce } from '../../utils/debounce';

type Props = {
  query: string;
  selectedOption: SelectOptions;
  setSelectedOption: Dispatch<SetStateAction<SelectOptions>>;
  setQuery: (arg: string) => void;
};

export const TodoFilter: FC<Props> = memo(({
  query,
  selectedOption,
  setSelectedOption,
  setQuery,
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);

  const handleInpute = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setCurrentQuery(value);
    debounce(setQuery, 1000)(value);
  }, [setCurrentQuery, debounce]);

  const handleSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as SelectOptions);
  }, [selectedOption]);

  const ressetQuery = useCallback(() => {
    setCurrentQuery('');
    setQuery('');
  }, [setCurrentQuery, setQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleSelect}
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
          value={currentQuery}
          onChange={handleInpute}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={ressetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
});
