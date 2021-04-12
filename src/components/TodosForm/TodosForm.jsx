import React from 'react';
import PropTypes from 'prop-types';
import './TodosForm.scss';

export const TodosForm = ({
  title,
  handleChangeInput,
  taskStatus,
  filterTodos,
}) => (
  <>
    <div className="input-size">
      <input
        type="text"
        name="title"
        placeholder="Todos by title"
        value={title}
        onChange={handleChangeInput}
        className="input is-info"
      />
    </div>

    <div className="select is-link">
      <select
        className="taskStatus"
        name="taskStatus"
        value={taskStatus}
        onChange={filterTodos}
      >
        <option>
          All todos
        </option>
        <option>
          Active(not completed) todos
        </option>
        <option>
          Completed todos
        </option>
      </select>
    </div>
  </>
);

TodosForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  taskStatus: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};
