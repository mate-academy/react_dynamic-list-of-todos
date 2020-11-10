import PropTypes from 'prop-types';

export const todoPropTypesShape = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
