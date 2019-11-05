import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { sortBy } = this.props;

    return (
      <div className="button-wrapper">
        <button
          className="load-button"
          type="button"
          onClick={() => sortBy('title')}
        >
          Sort by title
        </button>
        <button
          className="load-button"
          type="button"
          onClick={() => sortBy('user')}
        >
          Sort by user
        </button>
        <button
          className="load-button"
          type="button"
          onClick={() => sortBy('completed')}
        >
          Sort by status
        </button>
        <button
          className="load-button"
          type="button"
          onClick={() => sortBy()}
        >
          Reset
        </button>
      </div>
    );
  }
}

Filter.propTypes = {
  sortBy: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Filter;
