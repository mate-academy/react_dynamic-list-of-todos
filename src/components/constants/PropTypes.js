import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};

export const UserProps = {
  data: PropTypes.shape(userShape).isRequired,
};

export const TodoItemProps = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape(userShape),
  }).isRequired,
};
