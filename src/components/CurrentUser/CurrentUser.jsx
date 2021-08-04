import React from 'react';
import './CurrentUser.scss';
import { getUsersInfo } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.setUser(getUsersInfo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.setUser(getUsersInfo);
    }
  }

  setUser = async(callback) => {
    callback(this.props.selectedUserId).then(user => this.setState({ user }));
  }

  render() {
    const { clearSelectedUser } = this.props;
    const { selectedUserId } = this.props;

    return (
      <div className="CurrentUser">
        {!this.state.user ? 'Loading...' : (
          <div>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {this.state.user.id}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{this.state.user.name}</h3>
            <p className="CurrentUser__email">{this.state.user.email}</p>
            <p className="CurrentUser__phone">{this.state.user.phone}</p>
            <button
              type="button"
              onClick={() => clearSelectedUser()}
            >
              Clear
            </button>
          </div>
        )
        }
      </div>
    );
  }
}
