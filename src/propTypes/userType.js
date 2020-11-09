import PropTypes from 'prop-types';

export const userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
