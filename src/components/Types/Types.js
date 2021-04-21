import PropTypes from 'prop-types';

export const TodoType = {
  completed: PropTypes.bool || false,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
