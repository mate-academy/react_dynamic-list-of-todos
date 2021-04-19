import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api'
import { propTypes } from '../../types'

export class CurrentUser extends React.PureComponent {
  state = {
    selectedUser : {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => {
        this.setState({
          selectedUser: user.data
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => {
          this.setState({
            selectedUser :  user.data
          })
        }
      );
    }
  }

  render() {
    const { id, name, email, phone } = this.state.selectedUser;

    return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>Selected user: {id}</span></h2>
      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>
    </div>
    )
  }
}

CurrentUser.propTypes = propTypes;