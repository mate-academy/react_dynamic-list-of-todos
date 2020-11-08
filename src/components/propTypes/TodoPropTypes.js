import PropTypes from 'prop-types';

export const TodoPropTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  completed: PropTypes.bool,
};
