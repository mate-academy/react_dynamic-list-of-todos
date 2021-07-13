import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount = () => {
    this.loadData();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const selectedUser = await getUsers(this.props.userId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;
    const { clearUser } = this.props;

    return (
      <>
        <button
          type="button"
          className="button"
          onClick={clearUser}
        >
          Clear
        </button>
        {selectedUser && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {` ${selectedUser.id}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
          </div>
        )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
