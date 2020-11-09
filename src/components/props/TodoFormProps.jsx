import PropTypes from 'prop-types';

export const TodoFormProps = {
  onChangeHandler: PropTypes.func.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

