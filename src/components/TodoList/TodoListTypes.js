import PropTypes from 'prop-types';

export const TodoListTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  updateSelectUserId: PropTypes.func,
  updateTodos: PropTypes.func,
};
