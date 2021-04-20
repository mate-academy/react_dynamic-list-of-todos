import PropTypes from 'prop-types';

export const TodoType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

TodoType.defaultProps = {
  title: '',
  completed: false,
};

export const UserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
});
