type Props = {
  selectStatus: (value: string) => void;
  filtredQuery: (value: string) => void;
  query: string;
};
// filterChange: () => any;

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  filtredQuery,
  query,
}) => {
  // const [query, setQuery] = useState('');
  // const [filterStatus, setFilterStatus] = useState('all');

  // const f = query1 => {
  //   // console.log(query1, filterStatus);
  //   filterChange({ status: filterStatus, query: query1 });
  // };

  // const s = filterStatus1 => {
  //   // console.log(query, filterStatus1);
  //   filterChange({ status: filterStatus1, query: query });
  // };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => selectStatus(e.target.value)}
            // onChange={e => {
            //   setFilterStatus(e.target.value);
            //   s(e.target.value);
            // }}
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
          value={query}
          placeholder="Search..."
          onChange={e => filtredQuery(e.target.value)}
          // onChange={e => {
          //   setQuery(e.target.value);
          //   f(e.target.value);
          // }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query !== '' ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => filtredQuery('')}
              // onClick={() => {
              //   setQuery('');
              //   f('');
              // }}
            />
          </span>
        ) : (
          ''
        )}
      </p>
    </form>
  );
};
