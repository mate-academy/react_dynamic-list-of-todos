import PropTypes from 'prop-types';

export const TodoListType = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  chooseUser: PropTypes.func.isRequired,
  toggleStatus: PropTypes.func.isRequired,
};

export const CurrentUserType = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
