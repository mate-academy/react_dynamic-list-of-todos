import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  userId: number;
};

type State = {
  user: User;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
  };

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({
      user: { ...user },
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      getUser(this.props.userId)
        .then(user => (
          this.setState({
            user: { ...user },
          })));
    }
  }

  componentWillUnmount() {
    this.clearUser();
  }

  clearUser = () => {
    this.setState({
      user: {
        id: 0,
        name: '',
        email: '',
        phone: '',
      },
    });
  };

  render() {
    const {
      id,
      name,
      email,
      phone,
    } = this.state.user;

    return (
      <>
        {id > 0 && (
          <>
            <div className="CurrentUser">
              <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

              <h3 className="CurrentUser__name">{name}</h3>
              <p className="CurrentUser__email">{email}</p>
              <p className="CurrentUser__phone">{phone}</p>
            </div>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.clearUser}
            >
              Clear
            </button>
          </>
        )}
      </>
    );
  }
}
