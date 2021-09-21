import React from 'react';

type Props = {
  onHandleChange: (event: InputOrSelect) => void;
  filteredQuery: string;
  selectedQuery: string;
};

export const TodoForm: React.FC<Props> = (props) => {
  const { onHandleChange, filteredQuery, selectedQuery } = props;

  return (
    <div className="TodoList__form">
      <label className="TodoList__label" htmlFor="filterTitle">
        <input
          type="text"
          name="filteredQuery"
          id="filterTitle"
          className="form-control"
          placeholder="find title"
          value={filteredQuery}
          onChange={onHandleChange}
        />
      </label>

      <label className="TodoList__label" htmlFor="selectedTodo">
        <select
          name="selectedQuery"
          id="selectedTodo"
          value={selectedQuery}
          className="form-control"
          onChange={onHandleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>
    </div>
  );
};
