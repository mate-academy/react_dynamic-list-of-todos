import React, { FC } from 'react';

interface Props {
  sortByTitle: () => void;
  sortByUserName: () => void;
  sortByCompleted: () => void;
}

export const Actions: FC<Props> = ({ sortByTitle, sortByUserName, sortByCompleted }) => (
  <>
    <button className="button" type="button" onClick={sortByTitle}>Sort by title</button>
    <button className="button" type="button" onClick={sortByUserName}>Sort by user</button>
    <button className="button" type="button" onClick={sortByCompleted}>Sort by completed</button>
  </>
);
