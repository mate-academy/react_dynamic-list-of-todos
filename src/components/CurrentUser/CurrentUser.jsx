/* eslint-disable */
import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    await this.getUser();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      await this.getUser();
    }
  }

  getUser = async () => {
    const user = await getUser(this.props.userId);
    this.setState({ user })
  }

  render() {
    const { deleteUser } = this.props;
    const { user } = this.state;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
            Selected user:
            {this.props.userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </div>
        <button
          onClick={deleteUser}
          type="button"
          className="button is-link"
        >
          Clear
        </button>
      </>
    );
  }
}
