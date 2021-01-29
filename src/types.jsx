import PropTypes from 'prop-types';

const todosType = PropTypes.arrayOf(PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
}));

const todoType = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

export const todoListType = {
  todos: todosType.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export const TodoType = {
  todo: todoType.isRequired,
  isSelectedUser: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export const currentUserType = {
  userId: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
