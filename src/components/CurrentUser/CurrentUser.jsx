import React from 'react';
import PropTypes from 'prop-types';
import { loadUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    selectedUserDetails: [],
    userError: false,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  handleClickClear = () => {
    this.props.onReset(0);
  }

  async loadData() {
    const selectedUser = await loadUser(this.props.userId);

    if (selectedUser.data === null) {
      this.setState({ userError: true });

      return false;
    }

    this.setState({
      selectedUserDetails: selectedUser.data,
      userError: false,
    });
  }

  render() {
    const { userId } = this.props;
    const { userError } = this.state;
    const { name, email, phone } = this.state.selectedUserDetails;

    return (

      <>
        {userError ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>Invalid User</span></h2>
          </div>
        )
          : (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {userId}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{name}</h3>
              <p className="CurrentUser__email">{email}</p>
              <p className="CurrentUser__phone">{phone}</p>
            </div>
          )
      }
        <button
          type="button"
          onClick={this.handleClickClear}
        >
          Clear
        </button>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
};
