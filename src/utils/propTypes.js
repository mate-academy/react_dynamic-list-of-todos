import PropTypes from 'prop-types';

export const userPropTyes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export const todoPropTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export const todoListPropTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoPropTypes)).isRequired,
};
