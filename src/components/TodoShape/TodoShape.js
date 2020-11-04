import PropTypes from 'prop-types';

export const TodoShape = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  createAt: PropTypes.string,
  updatedAt: PropTypes.string,
};
