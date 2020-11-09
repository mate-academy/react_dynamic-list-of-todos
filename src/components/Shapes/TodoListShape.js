import PropTypes from 'prop-types';
import { FilterOfTodosShape } from './FilterOfTodosShape';

export const TodoListShape = {
  ...FilterOfTodosShape,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string.isRequired,
    }),
  ),
};
