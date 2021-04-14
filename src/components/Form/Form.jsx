import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export class Form extends React.Component {
  handleChangeInput = (changeEvent) => {
    const { value } = changeEvent.target;

    const { onChangeQuery } = this.props;

    onChangeQuery(value);
  }

  handleChangeSelect = (changeEvent) => {
    const { value } = changeEvent.target;

    const { onChangeSelectedStatus } = this.props;

    onChangeSelectedStatus(value);
  }

  render() {
    const statusesOfTodos = ['All', 'Acive', 'Completed'];
    const { query, selectedStatus } = this.props;

    return (
      <form className="form">
        <input
          type="text"
          name="query"
          className="form__input"
          placeholder="title..."
          value={query}
          onChange={this.handleChangeInput}
        />
        <select
          value={selectedStatus}
          name="selectedStatus"
          className="form__select"
          onChange={this.handleChangeSelect}
        >
          {statusesOfTodos.map(status => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

Form.propTypes = {
  query: PropTypes.string.isRequired,
  selectedStatus: PropTypes.string.isRequired,
  onChangeQuery: PropTypes.func.isRequired,
  onChangeSelectedStatus: PropTypes.func.isRequired,
};
