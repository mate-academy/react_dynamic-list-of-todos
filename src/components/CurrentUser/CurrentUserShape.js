import PropTypes from 'prop-types';

export const CurrentUserShape = PropTypes.shape({
  getUser: PropTypes.func.isRequired,
  clearUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
}).isRequired;
