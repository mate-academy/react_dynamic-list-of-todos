import PropTypes from 'prop-types';

export const TodoListPropTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const TodoItemPropTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};

export const UserPropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};
