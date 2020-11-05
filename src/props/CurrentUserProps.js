import PropTypes from 'prop-types';

export const CurrentUserProps = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  resetUser: PropTypes.func.isRequired,
};
