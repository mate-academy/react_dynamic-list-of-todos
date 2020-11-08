import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { selectedUser } = this.props;

    return (
      <>
        {user
          ? (
            <div className="App__content-container">
              <div className="CurrentUser">
                <h2 className="CurrentUser__title">
                  <span>{`Selected user: ${user.id}`}</span>
                </h2>
                <h3 className="CurrentUser__name">{user.name}</h3>
                <p className="CurrentUser__email">{user.email}</p>
                <p className="CurrentUser__phone">{user.phone}</p>
                <button
                  className="CurrentUser__clear button"
                  type="button"
                  onClick={() => selectedUser(0)}
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (<div className="CurrentUser__waiting">Please, wait</div>)
        }
      </>
    );
  }
}
CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectedUser: PropTypes.func.isRequired,
};
