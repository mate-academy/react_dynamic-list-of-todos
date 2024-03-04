import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import Filter from '../../types/Filter';
import { Todo } from '../../types/Todo';

interface Props {
  values: Values;
}

interface Values {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filter: (arg: string) => Promise<Todo[]>;
  setData: Dispatch<SetStateAction<Todo[]>>;
  type: Filter;
  setType: Dispatch<SetStateAction<Filter>>;
}

export const TodoFilter: React.FC<Props> = ({ values }) => {
  const { query, setQuery, filter, setData, setType, type } = values;
  // const [query, setQuery] = useState('');
  // const [type, setType] = useState(Filter.ALL);
  // const filter = async (filterType: string) => {
  //   let dataFromServer: undefined | Todo[];
  //   const data = await getTodos();

  //   switch (filterType) {
  //     case Filter.ALL:
  //       dataFromServer = data;
  //       break;
  //     case Filter.ACTIVE:
  //       dataFromServer = data.filter(elem => !elem.completed);
  //       break;
  //     case Filter.COMPLETED:
  //       dataFromServer = data.filter(elem => elem.completed);
  //       break;
  //     default:
  //       dataFromServer = data;
  //       break;
  //   }

  //   if (query.trim() !== '' && query) {
  //     return dataFromServer.filter(elem => {
  //       return elem.title.toLowerCase().includes(query.toLowerCase());
  //     });
  //   }

  //   return dataFromServer;
  // };

  const handlechange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value as Filter);
    filter(event.currentTarget.value).then(data => {
      setData(data as Todo[]);
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    filter(type).then(data => {
      setData(data as Todo[]);
    });
  };

  const clearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    filter(type).then(data => {
      setData(data as Todo[]);
    });
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handlechange}>
            <option value={Filter.ALL} selected>
              All
            </option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearQuery}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
