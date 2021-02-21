import React from 'react';
import './TodoFilter.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, handleInput } from '../../store/todoFilter';

export const TodoFilter = () => {
  const title = useSelector(state => state.todoFilterReducer.todoTitle);
  const filter = useSelector(state => state.todoFilterReducer.filter);

  const dispatch = useDispatch();

  return (
    <form className="TodoFilter" action="">
      <input
        className="TodoFilter__field"
        type="text"
        name="title"
        value={title}
        onChange={(event) => {
          dispatch(handleInput(event.target.value));
        }}
      />

      <select
        className="TodoFilter__field"
        name="selectedFilter"
        value={filter}
        onChange={(event) => {
          dispatch(selectFilter(event.target.value));
        }}
      >
        <option value="ALL">All</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </form>
  );
};
