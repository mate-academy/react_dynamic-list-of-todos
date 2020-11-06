import PropTypes from 'prop-types';

export const CurrentUserProps = {
  userId: PropTypes.number.isRequired,
  resetUserId: PropTypes.func.isRequired,
};
