import PropTypes from 'prop-types';

export const TodoListProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })),
  getCurrentUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};


export const TodoListDefaultProps = {
  selectedUserId: null,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: null,
  })),
};
