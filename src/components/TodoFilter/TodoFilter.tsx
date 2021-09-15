import React from 'react';
import { TodoStatus } from '../../types';
import './TodoFilter.scss';

interface Props {
  titlePhrase: string;
  handleChange: (value: string) => void;
  todoStatus: TodoStatus;
  selectStatus: (status: TodoStatus) => void;
}

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    titlePhrase,
    handleChange,
    todoStatus,
    selectStatus,
  } = props;

  return (
    <div className="filter-block">
      <input
        type="text"
        className="filter-block__input"
        value={titlePhrase}
        placeholder="Search by title"
        onChange={(event) => handleChange(event.target.value)}
      />

      <select
        name="progressTodo"
        value={todoStatus}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => (
          selectStatus(event.target.value as TodoStatus)
        )}
      >
        <option value={TodoStatus.Default} disabled>
          Choose todo status
        </option>
        <option value={TodoStatus.All}>
          All
        </option>
        <option value={TodoStatus.Active}>
          Active
        </option>
        <option value={TodoStatus.Completed}>
          Completed
        </option>
      </select>
    </div>
  );
};
