import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getData } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getData(`users/${this.props.userId}`)
      .then(({ data }) => this.setState({ user: { ...data } }));
  }

  componentDidUpdate(prevPops) {
    if (prevPops.userId !== this.props.userId) {
      getData(`users/${this.props.userId}`)
        .then(({ data }) => this.setState({ user: { ...data } }));
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <>
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
        </div>

        <button type="button" onClick={this.props.onClear}>
          clear
        </button>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};
