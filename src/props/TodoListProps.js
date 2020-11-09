import PropTypes from 'prop-types';
import { FilterProps } from './FilterProps';

export const TodoListProps = {
  ...FilterProps,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string.isRequired,
    }),
  ),
};
