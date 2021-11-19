import React from 'react';
import { User } from '../../react-app-env';
import './CurrentUser.scss';
import { requestUserById } from '../../api';

type Props = {
  userId: number,
  clearUserId: () => void,
};

interface State {
  user: User,

}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {} as User,
  };

  async componentDidMount() {
    const loadedUser = await requestUserById(this.props.userId);

    this.setState({
      user: loadedUser,
    });
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.userId !== this.props.userId) {
      const loadedUser = await requestUserById(this.props.userId);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        user: loadedUser,
      });
    }
  }

  render() {
    const {
      name,
      phone,
      id,
      email,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          onClick={this.props.clearUserId}
        >
          Clear
        </button>
      </div>
    );
  }
}
