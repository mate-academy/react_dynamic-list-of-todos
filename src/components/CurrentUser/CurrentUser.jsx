import React from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    if (this.props.userId) {
      await this.LoadUser(this.props.userId);
    }
  }

  async componentDidUpdate(prevProps) {
    if ((prevProps.userId !== this.props.userId) && this.props.userId) {
      await this.LoadUser(this.props.userId);
    }
  }

  async LoadUser(id) {
    const user = await getUsers(id);

    this.setState({ user: user.data });
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          {this.state.user
             && (
               <span>
                 Selected user:
                 {' '}
                 {this.props.userId}
               </span>
             )}
        </h2>
        <h3 className="CurrentUser__name">{this.state.user?.name}</h3>
        <p className="CurrentUser__email">{this.state.user?.email}</p>
        <p className="CurrentUser__phone">{this.state.user?.phone}</p>
        {!this.state.user ? 'No such a user' : ''}
        {' '}
        <button
          type="button"
          className="button"
          onClick={this.props.defUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  defUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
