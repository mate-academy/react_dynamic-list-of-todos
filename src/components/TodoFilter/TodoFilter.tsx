export const TodoFilter = ({
  query,
  onQueryChange,
  onClearQuery,
  status,
  onStatusChange,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  onClearQuery: () => void;
  status: 'all' | 'completed' | 'active';
  onStatusChange: (s: 'all' | 'completed' | 'active') => void;
}) => (
  <div>
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={e => onQueryChange(e.target.value)}
    />
    {query && <button onClick={onClearQuery}>x</button>}

    <select
      value={status}
      onChange={e =>
        onStatusChange(e.target.value as 'all' | 'completed' | 'active')
      }
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>
);
