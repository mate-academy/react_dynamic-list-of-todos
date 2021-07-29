import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  async getUser() {
    const selectedUser = await getUsers(this.props.userId);

    this.setState({ selectedUser });
  }

  componentDidMount = () => {
    this.getUser();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {'Selected user: '}
              {selectedUser.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{selectedUser.name}</h3>
          <p className="CurrentUser__email">{selectedUser.email}</p>
          <p className="CurrentUser__phone">{selectedUser.phone}</p>
        </div>
        <button type="button" onClick={this.props.clearUser}>Clear</button>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
