import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';
import PropTypes from 'prop-types';

export class CurrentUser extends React.PureComponent {

  state = {
    user: {},
    userId: 0,
  }

  componentDidMount() {
    getUser(this.props.userId)
    .then(user => this.setState({
      user,
      userId: user.id
    }))
  }

  componentDidUpdate(prevState) {
    if(prevState.userId !== this.props.userId){
      getUser(this.props.userId)
      .then(user => this.setState({
        user,
        userId: user.id
      }))
    }
  }

  render() {

    const { user } = this.state;
    const { onReset } = this.props

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button type="button" onClick={onReset}>
        Clear
        </button>
      </div>
    )
  };
}

CurrentUser.propTypes = {
  onReset: PropTypes.func.isRequired,
}
