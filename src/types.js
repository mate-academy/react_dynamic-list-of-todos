import PropTypes from 'prop-types';

export const TodoType = PropTypes.shape({
  title: PropTypes.string,
  completed: PropTypes.bool,
  userId: PropTypes.number.isRequired,
});

TodoType.defaultProps = {
  title: '',
  completed: false,
};
