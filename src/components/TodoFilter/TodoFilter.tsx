import React from 'react';
import './TodoFilter.scss';

enum TodoStatus {
  default = 'Default',
  all = 'All',
  completed = 'Completed',
  active = 'Active',
}

interface Props {
  titlePhrase: string;
  handleChange: (value: string) => void;
  todoStatus: TodoStatus;
  selectStatus: (status: TodoStatus) => void;
}

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    titlePhrase, handleChange, todoStatus, selectStatus,
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
        <option value={TodoStatus.default} disabled>
          Choose todo status
        </option>
        <option value={TodoStatus.all}>
          {TodoStatus.all}
        </option>
        <option value={TodoStatus.active}>
          {TodoStatus.active}
        </option>
        <option value={TodoStatus.completed}>
          {TodoStatus.completed}
        </option>
      </select>
    </div>
  );
};
