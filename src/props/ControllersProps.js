import PropTypes from 'prop-types';

export const ControllersProps = {
  selectValue: PropTypes.string.isRequired,
  filterQuery: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
