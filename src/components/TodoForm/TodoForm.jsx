import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';

export class TodoForm extends Component {
  state = {
    inputValue: '',
    selectValue: 'all',
    selectRange: ['all', 'active', 'completed'],
  };

  filterTodosByTitle = (event) => {
    const { value } = event.target;
    const { onTitleFiltering } = this.props;

    this.setState({
      inputValue: value,
    });
    onTitleFiltering(value);
  };

  filterTodosByStatus = (event) => {
    const { value } = event.target;
    const { onStatusFiltering } = this.props;

    this.setState({ selectValue: value });

    onStatusFiltering(value);
  };

  render() {
    const {
      inputValue,
      selectValue,
      selectRange,
    } = this.state;
    const { onRandomize } = this.props;

    return (
      <div className="input-group">
        <label className="input-group-text" htmlFor="inputFilter">
          Filter by title
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          id="inputFilter"
          value={inputValue}
          onChange={this.filterTodosByTitle}
        />
        <label className="input-group-text" htmlFor="selectFilter">
          Which todos to show?
        </label>
        <select
          className="form-select"
          id="selectFilter"
          value={selectValue}
          onChange={this.filterTodosByStatus}
        >
          {selectRange.map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        <Button innerText="Randomize" action={onRandomize} />
      </div>
    );
  }
}

TodoForm.propTypes = {
  onTitleFiltering: PropTypes.func.isRequired,
  onStatusFiltering: PropTypes.func.isRequired,
  onRandomize: PropTypes.func.isRequired,
};
