import PropTypes from 'prop-types';

export const FilterProps = {
  showedTodos: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeFilterText: PropTypes.func.isRequired,
};
