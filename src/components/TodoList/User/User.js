import React, { Component } from 'react';
import UserDetails from './UserDetails/UserDetails';
import './User.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed: false,
      showingLogin: false
    };

    this._toggleDetails = this._toggleDetails.bind(this);
    this._showLogin = this._showLogin.bind(this);
    this._hideLogin = this._hideLogin.bind(this);
  }

  _toggleDetails() {
    this.setState(prevState => ({
      detailed: !prevState.detailed
    }));
  }

  _showLogin() {
    this.setState({
      showingLogin: true
    });
  }

  _hideLogin() {
    this.setState({
      showingLogin: false
    });
  }

  render() {
    const { detailed, showingLogin } = this.state;
    const { name, username, phone, companyName } = this.props;
    let { email, website } = this.props;
    const details = detailed
      ? (
        <div className="login">
          <UserDetails
            website={website}
            phone={phone}
            companyName={companyName}
          />
        </div>
      ) : '';
    const login = showingLogin
      ? (<div className="login">Write to user {username}</div>)
      : '';

    if (!(/^mailto:\.+/.test(email))) email = `mailto:${email}`;
    if (!(/^https:\/\/\.+/.test(website))) website = `https://${website}`;

    return (
      <div className="info-user">
        <div className="info-header">
          <span className="detalizer" onClick={this._toggleDetails}>
            {detailed ? '--' : '+'}
          </span>
          <a
            href={email}
            onMouseOver={this._showLogin}
            onMouseLeave={this._hideLogin}
          >
            {name}
          </a>
          <CSSTransitionGroup
            transitionName="detailed"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
          >
            {login}
            {details}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}
