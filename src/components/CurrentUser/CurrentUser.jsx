import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';
import { CurrentUserShape } from './CurrentUserShape';

export class CurrentUser extends React.PureComponent {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    this.userUpdate(this.props.selectedUserId);
  }

  componentDidUpdate() {
    this.userUpdate(this.props.selectedUserId);
  }

  async userUpdate(userId) {
    const { currentUser } = this.state;

    if (userId !== currentUser.id) {
      const user = await getUser(userId);

      this.setState({ currentUser: user });
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">
            {currentUser.email}
          </p>
          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>
        </div>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={this.props.clearUserId}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = CurrentUserShape;
