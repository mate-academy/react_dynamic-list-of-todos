import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount = async() => {
    const user = await getUser(this.props.selectedUserId);

    if (user) {
      this.updateUser(user);
    }
  }

  componentDidUpdate = async(prevProps) => {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      const user = await getUser(this.props.selectedUserId);

      if (user) {
        this.updateUser(user);
      } else {
        this.updateUser(null);
      }
    }
  }

  updateUser = (currentUser) => {
    this.setState({ currentUser });
  }

  render() {
    const { clear } = this.props;
    const { currentUser } = this.state;

    return ((currentUser !== null)
      ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user :&nbsp;
              {currentUser.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
          <button
            type="button"
            onClick={() => clear()}
          >
            Clear
          </button>
        </div>
      )
      : <p>User not found</p>
    );
  }
}

CurrentUser.propTypes = {
  clear: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
