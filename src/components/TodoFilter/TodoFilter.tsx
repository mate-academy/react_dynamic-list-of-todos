import React from 'react';

export interface TodoFilterProps {
  setTodoQuery: (query : string) => void;
  setTodoSearchQuery: (title : string) => void;
  todoSearchQuery : string
}

export const TodoFilter: React.FC<TodoFilterProps> = ({setTodoQuery , setTodoSearchQuery , todoSearchQuery}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" defaultValue="all"  onChange={event => setTodoQuery(event.target.value)}>

            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={todoSearchQuery}
          onChange={(event)=>setTodoSearchQuery(event.target.value) }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {todoSearchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTodoSearchQuery("")}
            />
        </span>
        )}
      </p>
    </form>
  );
};
