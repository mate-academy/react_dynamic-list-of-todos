import React from 'react';
import './CurrentUser.scss';

type Props = {
  user: User,
  clear: () => void,
};

export class CurrentUser extends React.Component<Props, {}> {
  state = {};

  render() {
    const {
      name,
      email,
      phone,
      id,
    } = this.props.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          className="CurrentUser__clear"
          type="button"
          onClick={this.props.clear}
        >
          Clear
        </button>
      </div>
    );
  }
}
