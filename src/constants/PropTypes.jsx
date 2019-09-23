import PropTypes from 'prop-types';

export const UserProps = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

const UserShape = PropTypes.shape({
  name: PropTypes.string,
}).isRequired;

export const TodoProps = {
  todo: PropTypes.shape({
    key: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: UserShape,
    })
  ).isRequired,
};
