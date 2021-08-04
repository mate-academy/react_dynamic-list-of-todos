import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    currentUser: null,
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  clear = () => {
    this.setState({ currentUser: null });
    this.props.clearUser(0);
  }

  async loadData() {
    const user = await getUser(this.props.userId);

    this.setState({ currentUser: user });
  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      return (<p>Loading</p>);
    }

    return (
      <div className="CurrentUser">
        {currentUser !== null && (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${currentUser.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{currentUser.name}</h3>
            <p className="CurrentUser__email">{currentUser.email}</p>
            <p className="CurrentUser__phone">{currentUser.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.clear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
