import React, { useMemo } from 'react';

// add prop types to UsersPagination
export const UsersPagination = ({ pages, setPageId }) => {
  const buttons = useMemo(() => (
    Array(pages)
      .fill()
      .map((item, index) => ({
        id: Math.random(),
        value: index + 1,
      }))
  ), [pages]);

  return (
    <div>
      {buttons.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => setPageId(item.value)}
        >
          {item.value}
        </button>
      ))}
    </div>
  );
};
