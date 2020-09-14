import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.PureComponent {
  render() {
    const { todo, selectUser } = this.props;

    return (
      <>
        <label>
          <input type="checkbox" readOnly />
          <p>{todo.title}</p>
        </label>

        <button
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
          value={todo.userId}
          onClick={event => selectUser(event)}
        >
          {`User #${todo.userId}`}
        </button>
      </>
    );
  }
}
Todo.propTypes = {
  selectUser: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
Todo.defaultProps = {
  todo: {},
};
