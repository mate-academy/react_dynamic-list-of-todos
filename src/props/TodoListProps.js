import PropTypes from 'prop-types';
import { ControllersProps } from './ControllersProps';

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number,
    }),
  ),
  ...ControllersProps,
};
