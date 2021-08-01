import propTypes from 'prop-types';

export const TodoType = {
  id: propTypes.number.isRequired,
  userId: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  completed: propTypes.bool.isRequired,
};
