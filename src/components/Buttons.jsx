import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({ sortByName, sortByTitle, sortByCompleted }) => (
  <div className="button_list">
    <button
      type="button"
      onClick={() => {
        sortByName('name');
      }}
      className="sort_button"
    >
Sort By Name
    </button>

    <button
      type="button"
      onClick={() => {
        sortByTitle('title');
      }}
      className="sort_button"
    >
Sort By Title
    </button>

    <button
      type="button"
      onClick={() => {
        sortByCompleted('completed');
      }}
      className="sort_button"
    >
Sort By Completed
    </button>
  </div>
);

Buttons.propTypes = {
  sortByName: PropTypes.func.isRequired,
  sortByTitle: PropTypes.func.isRequired,
  sortByCompleted: PropTypes.func.isRequired,
};

export default Buttons;
