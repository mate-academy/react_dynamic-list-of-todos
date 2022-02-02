import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import './SearchForm.scss';

type Props = {
  query: string,
  todoStatus: TodoStatus,
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
};

export const SearchForm: React.FC<Props> = ({
  query,
  todoStatus,
  onChange,
}) => (
  <form className="form">
    <input
      type="text"
      value={query}
      name="query"
      onChange={onChange}
      className="input is-link"
    />

    <div className="select">
      <select
        name="todoStatus"
        value={todoStatus}
        onChange={onChange}
      >
        <option value={TodoStatus.All}>All</option>
        <option value={TodoStatus.Active}>Active</option>
        <option value={TodoStatus.Completed}>Completed</option>
      </select>
    </div>
  </form>
);
