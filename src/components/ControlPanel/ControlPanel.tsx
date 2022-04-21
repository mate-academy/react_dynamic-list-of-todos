import React from 'react';
import classNames from 'classnames';
import './ControlPanel.scss';

type Props = {
  value: string;
  sortBy: string;
  randomSort: boolean;
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeRandomSort: () => void;
};

export const ControlPanel: React.FC<Props> = ({
  value,
  changeValue,
  sortBy,
  changeSortBy,
  randomSort,
  changeRandomSort,
}) => {
  return (
    <div className="ControlPanel App__ControlPanel">
      <h2 className="title ControlPanel__title">
        Control panel
      </h2>
      <div className="sorting-form ControlPanel__sorting-form">
        <input
          className="sorting-form__input"
          type="text"
          placeholder="Search todo"
          value={value}
          onChange={changeValue}
        />

        <div className="sorting-form__footer">
          <select
            className="button sorting-form__select"
            value={sortBy}
            onChange={changeSortBy}
          >
            <option value="">Select sorting option</option>
            <option value="all">All todos</option>
            <option value="completed">Completed todos</option>
            <option value="active">Active todos</option>
          </select>
          <button
            className={classNames(
              'button',
              'sorting-form__button',
              { 'sorting-form__button--active': randomSort },
            )}
            type="button"
            onClick={changeRandomSort}
          >
            Randomize
          </button>
        </div>
      </div>
    </div>
  );
};
