import PropTypes, { shape } from 'prop-types';

export const TodoListsShape = {
  todos: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onUserSelect: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

export const TodoShape = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onUserSelect: PropTypes.func.isRequired,
};

export const TodoButtonShape = {
  userId: PropTypes.number.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};
