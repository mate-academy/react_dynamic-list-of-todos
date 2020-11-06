import React from 'react';
import { ListOptionsShape } from '../shapes/ListOptionsShape';

export const ListOptions = ({ titleQuery, statusQuery, handleChange }) => (
  <div>
    <input
      type="text"
      name="title"
      className="input"
      placeholder="Enter todo title"
      value={titleQuery}
      onChange={handleChange}
    />

    <select
      name="status"
      id="status"
      className="select"
      value={statusQuery}
      onChange={handleChange}
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
  </div>
);

ListOptions.propTypes = ListOptionsShape;

ListOptions.defaultProps = {
  titleQuery: '',
  statusQuery: 'all',
};
