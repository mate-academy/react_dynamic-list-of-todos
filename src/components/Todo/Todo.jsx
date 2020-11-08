import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class Todo extends React.PureComponent {
  render() {
    const { completed, title, userId, selectUser } = this.props;

    return (
      <>
        <label>
          <input type="checkbox" className="sss" />
          <p>{title}</p>
        </label>

        <button
          className={ClassNames('TodoList__user-button', 'button', {
            'TodoList__user-button--selected': completed,
          })}
          type="button"
          value={userId}
          onClick={event => selectUser(event)}
        >
          {`User #${userId}`}
        </button>
      </>
    );
  }
}
Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
