import { Options } from '../../types/FilteredOption';

type Props = {
  filter: Options
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setFilter: React.Dispatch<React.SetStateAction<Options>>
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  title,
  setTitle,
  setFilter,
}) => {
  const onDelete = () => {
    setTitle('');
  };

  const onChoose = (choosedField: Options) => {
    setFilter(Options[choosedField]);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => onChoose(event.target.value as Options)}
          >
            <option
              value={Options.all}
            >
              All
            </option>
            <option
              value={Options.active}
            >
              Active
            </option>
            <option
              value={Options.completed}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!title.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
