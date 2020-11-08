import PropTypes from 'prop-types';

export const CurrentUserType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
};
