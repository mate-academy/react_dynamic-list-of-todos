import React from 'react';
import { getUser } from '../../api/user';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clearHandler: () => void,
};

export class CurrentUser extends React.Component<Props> {
  state = {
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
      phone: '',
    },
    showCurrentUser: false,
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadCurrentUser();
    }
  }

  async loadCurrentUser() {
    try {
      const user = await getUser(`${this.props.userId}`);

      this.setState({
        user,
        showCurrentUser: true,
      });
    } catch (error) {
      this.setState({ showCurrentUser: false });
    }
  }

  render() {
    const {
      id,
      name,
      username,
      email,
      phone,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        {this.state.showCurrentUser ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">
              {name}
              {username}
            </h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>

            <button
              type="button"
              onClick={() => this.props.clearHandler()}
              className="button CurrentUser__button"
            >
              Clear
            </button>
          </>
        ) : (
          <p>No selected user</p>
        )}
      </div>
    );
  }
}
