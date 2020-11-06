import PropTypes from 'prop-types';

export const TodoShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  userId: PropTypes.number,
};
