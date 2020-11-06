import PropTypes from 'prop-types';

export const ListOptionsShape = {
  titleQuery: PropTypes.string,
  statusQuery: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
