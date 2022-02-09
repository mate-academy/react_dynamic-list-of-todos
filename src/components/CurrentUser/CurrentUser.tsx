import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  selectedUserId: number
  hideUser: () => void
}

export class CurrentUser extends React.PureComponent<Props, {}> {
  state = {
    user: null,
    error: null,
  };

  componentDidMount() {
    this.requestUser();
  }

  componentDidUpdate(prevProps:Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.requestUser();
    }
  }

  requestUser = () => {
    getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({
          user,
          error: null,
        });
      })
      .catch(() => {
        this.setState({ error: '404 not found ' });
      });
  };

  render() {
    const { user, error } = this.state;

    if (error) {
      return <h1>{error}</h1>;
    }

    if (user) {
      const {
        name, email, id, phone,
      } = user;

      return user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${id}`}</span>
          </h2>
          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>
          <button className="CurrentUser__clear button" type="button" onClick={this.props.hideUser}>Hide User</button>
        </div>
      );
    }

    return <></>;
  }
}
