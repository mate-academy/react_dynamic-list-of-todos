import React, { FC } from 'react';

interface Props {
  idSorter: () => void;
  titleSorter: () => void;
  userNameSorter: () => void;
  completedSorter: () => void;
}

export const Controller: FC <Props> = (props) => {
  const {
    idSorter,
    titleSorter,
    userNameSorter,
    completedSorter,
  } = props;

  return (
    <li className="list-group-item primary-bg">
      <div className="todo__cell todo__id">
        <button
          data-name="title"
          type="button"
          onClick={idSorter}
        >
          #
        </button>
      </div>
      <div className="todo__cell todo__title">
        <button
          data-name="title"
          type="button"
          onClick={titleSorter}
        >
          Sort by Title
        </button>
      </div>
      <div className="todo__cell todo__user">
        <button
          data-name="user"
          type="button"
          onClick={userNameSorter}
        >
          Sort by User
        </button>
      </div>
      <div className="todo__cell todo__completed">
        <button
          data-name="completed"
          type="button"
          onClick={completedSorter}
        >
          +
        </button>
      </div>
    </li>
  );
};
