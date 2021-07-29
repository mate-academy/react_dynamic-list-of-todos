import PropTypes from 'prop-types';

export const TodoListPropTypes = {
  chooseTheUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
  todos: PropTypes.arrayOf(PropTypes.shape([
    PropTypes.object,
  ])).isRequired,
};
