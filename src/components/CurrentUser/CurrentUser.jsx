import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  }

  async componentDidMount() {
    const userFromServer = await getUser(this.props.userId);

    this.setState({ user: userFromServer });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      const userFromServer = await getUser(this.props.userId);
      // eslint-disable-next-line
      this.setState({ user: userFromServer });
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button onClick={this.props.clearData} type="button">
          clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearData: PropTypes.func.isRequired,
};
