import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    visibleUser: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({
        visibleUser: user,
      }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({
          visibleUser: user,
        }));
    }
  }

  render() {
    const { visibleUser } = this.state;

    if (!visibleUser) {
      return (<div>Loading</div>);
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {` ${visibleUser.id}`}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{visibleUser.name}</h3>
        <p className="CurrentUser__email">{visibleUser.email}</p>
        <p className="CurrentUser__phone">{visibleUser.phone}</p>
        <button
          type="button"
          className="button"
          onClick={this.props.clearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
