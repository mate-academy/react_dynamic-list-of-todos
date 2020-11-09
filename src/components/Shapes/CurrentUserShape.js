import PropTypes from 'prop-types';

export const CurrentUserShape = {
  userId: PropTypes.number.isRequired,
  resetUserId: PropTypes.func.isRequired,
};
