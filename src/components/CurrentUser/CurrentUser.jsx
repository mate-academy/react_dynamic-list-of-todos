import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    this.getUser()
  }

  async componentDidUpdate(props) {
    if(props.userId !== this.props.userId){
      this.getUser()
    }
  }

  getUser = async() => {
    const user = await getUserInfo(this.props.userId);
    this.setState({
      user,
    })
  }

  render() {
    const { user } = this.state;
    return user && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>
    
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type='button'
          className='clear-button'
          onClick={this.props.onClick}
        >
          Clear
        </button>
      </div>
    );
  }
};

CurrentUser.defaultProps = {
  userId: null,
}

CurrentUser.propTypes = {
  userId: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}
