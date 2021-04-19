import propTypes from 'prop-types';

export const todoShape = {
  id: propTypes.number,
  userIdL: propTypes.number,
  title: propTypes.string,
  completed: propTypes.bool,
};
