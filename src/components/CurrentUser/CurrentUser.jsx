import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import '../../styles/general.scss';
import { getAll } from '../../api';

export class CurrentUser extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  loadData = async() => {
    const { userId } = this.props;
    const prepearedUser = await getAll(`users/${userId}`);

    this.setState({
      user: prepearedUser.data,
    });
  }

  render() {
    const { user } = this.state;
    const { clearUserSelection } = this.props;

    return (
      <>
        {!user ? (<div>Loading...</div>) : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="CurrentUser__clear button"
              type="button"
              onClick={clearUserSelection}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  clearUserSelection: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
