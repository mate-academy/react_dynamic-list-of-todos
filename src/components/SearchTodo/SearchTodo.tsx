import React from 'react';

type Props = {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  query: string,
  todoStatus: string,
};

export const SearchTodo: React.FC <Props> = ({
  changeHandler,
  query,
  todoStatus,
}) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Text input"
      value={query}
      name="query"
      onChange={changeHandler}
    />
    <div className="select">
      <select
        name="todoStatus"
        value={todoStatus}
        onChange={changeHandler}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </form>
);
