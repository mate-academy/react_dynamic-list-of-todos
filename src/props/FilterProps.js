import PropTypes from 'prop-types';

export const FilterProps = {
  selectValue: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
