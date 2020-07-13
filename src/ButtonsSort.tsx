import React, { MouseEvent } from 'react';

const buttonsSort = ['id', 'title', 'completed', 'name'];

type Props = {
  setSortField: (sortField: string) => void;
};

const ButtonsSort: React.FC<Props> = ({ setSortField }) => {
  const hendleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = (e.target as HTMLButtonElement);
    setSortField(name);
  };

  return (
    <tr>
      {buttonsSort.map(item => (
        <th>
          <button
            type="button"
            name={item}
            className="btnSort"
            onClick={e => hendleOnClick(e)}
          >
            By
            {' '}
            {item}
          </button>
        </th>
      ))}
    </tr>
  );
};

export default ButtonsSort;
