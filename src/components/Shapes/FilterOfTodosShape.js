import PropTypes from 'prop-types';

export const FilterOfTodosShape = {
  showedTodos: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
