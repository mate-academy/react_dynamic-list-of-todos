import PropTypes from 'prop-types';

export const TodoProps = {
  completed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  handleСhangeUserId: PropTypes.func.isRequired,
};
