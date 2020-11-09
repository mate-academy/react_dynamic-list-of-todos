import React from 'react';
import ClassNames from 'classnames';

export class Todo extends React.Component {
  render() {
    const { title, completed, selectUser, userId } = this.props;

    return (
      <>
        <div>
          <input type="checkbox" />
          <p>{title}</p>
        </div>

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
