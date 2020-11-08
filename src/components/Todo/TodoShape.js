import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number,
  completed: PropTypes.bool,
  title: PropTypes.string.isRequired,
}).isRequired;
