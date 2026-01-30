import React from 'react';
import { Select } from '../FormComponents/Select';
import { Input } from '../FormComponents/Input';

type Props = {
  valueInput: string;
  onSelectOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  valueInput,
  onSelectOption,
  onChangeInput,
  onClearSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <Select onChange={onSelectOption} />
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <Input onChangeInput={onChangeInput} value={valueInput} />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {valueInput && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        )}
      </span>
    </p>
  </form>
);
