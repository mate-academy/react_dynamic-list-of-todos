import React from 'react';
import { getData } from '../api';
import './CurrentUser.scss';

interface State {
  id: number | null;
  name: string;
  email: string;
  phone: string;
}

type Props = {
  selectedUserId: number;
  removeUserCelection: () => void;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUserInfo();
    }
  }

  nulifyUser = () => {
    this.setState({
      id: 0,
      name: '',
      email: '',
      phone: '',
    });
  };

  loadUserInfo() {
    getData(`/users/${this.props.selectedUserId}`)
      .then((user: User) => {
        this.setState({ ...user });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_ => {
        this.nulifyUser();
      });
  }

  render() {
    const {
      id,
      name,
      email,
      phone,
    } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {this.state.id === 0 ? (
              'Account not found'
            ) : (
              `Selected user: ${id}`
            )}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="CurrentUser__button button"
          onClick={this.props.removeUserCelection}
        >
          Clear
        </button>
      </div>
    );
  }
}
