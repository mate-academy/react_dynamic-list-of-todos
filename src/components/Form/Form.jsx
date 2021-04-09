import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ query, onChange }) => (
  <form>
    <input
      className="form__input form"
      type="text"
      name="query"
      placeholder="find title..."
      value={query}
      onChange={onChange}
    />
  </form>
);

Form.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
