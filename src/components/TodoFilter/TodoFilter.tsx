import { useState } from 'react';

type Props = {
  sortBy: (newSortValue: string) => void;
  search: (newSearchValue: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ sortBy, search }) => {
  const [simbolSearch, setSimbolSearch] = useState('');

  function clearSearch() {
    setSimbolSearch('');
    search('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const newSortValue = event.target.value;

              sortBy(newSortValue);
            }}
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
          value={simbolSearch}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const findeValue = event.target.value;

            search(findeValue);
            setSimbolSearch(findeValue);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {simbolSearch.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={clearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};

// import { Todo } from "../../types/Todo";
// import { useState } from 'react';

// type Props = {
//   filterType: string;
//   newFilterValue: (newValue: 'all' | 'active' | 'completed') => void;
// };

// export const TodoFilter: React.FC<Props> = ({ filterType, newFilterValue }) => {
//   const [value, setValue] = useState(filterType);

//   return (
//     <form className="field has-addons">
//       <p className="control">
//         <span className="select">
//           <select
//             data-cy="statusSelect"
//             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
//               const newValue = event.target.value as 'all' | 'active' | 'completed';

//               setValue(newValue);
//               newFilterValue(newValue);
//             }}

//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//           </select>
//         </span>
//       </p>

//       <p className="control is-expanded has-icons-left has-icons-right">
//         <input
//           data-cy="searchInput"
//           type="text"
//           className="input"
//           placeholder="Search..."
//         />
//         <span className="icon is-left">
//           <i className="fas fa-magnifying-glass" />
//         </span>

//         <span className="icon is-right" style={{ pointerEvents: 'all' }}>
//           {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//           <button data-cy="clearSearchButton" type="button" className="delete" />
//         </span>
//       </p>
//     </form>
//   );
// }
