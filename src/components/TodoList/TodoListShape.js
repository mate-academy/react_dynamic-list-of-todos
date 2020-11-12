import PropTypes from 'prop-types';
import { TodoShape } from '../Todo/TodoShape';

export const TodoListShape = PropTypes.shape({
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  selectUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
}).isRequired;
