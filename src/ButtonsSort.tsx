import React from 'react';

type Props = {
  setSortField: (sortField: string) => void;
};

const ButtonsSort: React.FC<Props> = ({ setSortField }) => {
  return (
    <tr>
      <th>
        <button
          type="button"
          className="btnSort "
          onClick={() => setSortField('id')}
        >
          By Id
        </button>
      </th>

      <th>
        <button
          type="button"
          className="btnSort"
          onClick={() => setSortField('title')}
        >
          By Title
        </button>
      </th>

      <th>
        <button
          type="button"
          className="btnSort"
          onClick={() => setSortField('completed')}
        >
          By Completed
        </button>
      </th>

      <th>
        <button
          type="button"
          className="btnSort"
          onClick={() => setSortField('name')}
        >
          By Performer
        </button>
      </th>
    </tr>
  );
};

export default ButtonsSort;
