import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';

import './Dropdown.scss';

export default class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  handleDropdownToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  };

  handleDropdownSelect = (e) => {
    this.setState({ isOpen: false });
    this.props.handleDropdownSelect(e.target.dataset.value);
  };

  render() {
    const { itemsList } = this.props;

    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleDropdownToggle}
        >
          Pagination per page
        </button>
        <div
          className={classNames('dropdown-menu', {
            show: this.state.isOpen,
          })}
          aria-labelledby="dropdownMenuButton"
        >
          {itemsList.map(item => (
            <p
              className="dropdown-item"
              data-value={item.value}
              onClick={this.handleDropdownSelect}
            >
              {item.option}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.objectOf({
    option: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  handleDropdownSelect: PropTypes.func.isRequired,
};

