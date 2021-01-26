import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api';

export class CurrentUser extends React.Component {
  state= {
    user: {},
  }

  async componentDidMount() {
    await this.userInfo(this.props.userId);
  }
  
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId) {
      await this.userInfo(this.props.userId);
    }
  }

  async userInfo(id) {
    const user = await getUserById(id);
    this.setState({
      user: user.data,
    })
  }

  render() {
    const { user } = this.state;

    return(
      <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>
  
      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        type='button'
        onClick={this.props.clearSelectedUser}
        className="CurrentUser__clear"
      >
        Clear user
      </button>
    </div>
    )
  }
};
