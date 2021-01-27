import PropTypes from 'prop-types';

export const TypeTodo = PropTypes.shape({
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool,
  title: PropTypes.string,
  userId: PropTypes.number,
});
