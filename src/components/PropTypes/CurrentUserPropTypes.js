import PropTypes from 'prop-types';

export const CurrentUserPropTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};
