import React from 'react';
import './CurrentUser.scss';

import PropTypes from 'prop-types'

export class CurrentUser extends React.Component{
  state = {
    userInfo: {
      "id": 0,
      "name":"",
      "username":"",
      "email":"",
      "phone":"",
      "website":"",
      "createdAt":"",
      "updatedAt":"",
    },
  }

  getUserInfo = () => {
    return fetch(`https://mate-api.herokuapp.com/users/${this.props.userId}`)
      .then(response => response.json());
  }

  componentDidMount() {
    this.getUserInfo().then(userInfoFromServer => {
      this.setState({
        userInfo: userInfoFromServer.data,
      })

    })
  }

  componentDidUpdate() {
    this.props.userId !== this.state.userInfo.id
      && this.getUserInfo().then(userInfoFromServer => {
      this.setState({
        userInfo: userInfoFromServer.data,
      })
    })
  }

  render() {
    const {id, name, email,phone} = this.state.userInfo;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>Selected user: {id}</span></h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        onClick ={this.props.clearSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
}
