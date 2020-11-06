import PropTypes from 'prop-types';

export const TodoPropType = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
};
