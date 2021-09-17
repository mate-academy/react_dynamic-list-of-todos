import React from 'react';
import { getUser } from '../../api';
import { Spinner } from '../Spinner';

import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  chooseUser: (userId: number) => void;
}

interface State {
  id: number;
  name: string;
  email: string;
  phone: string;
}
export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const { selectedUserId } = this.props;

    this.setState({
      id: 0,
    });

    const user: User = await getUser(selectedUserId);

    this.setState({
      ...user,
    } as User);
  }

  render() {
    const {
      id,
      name,
      phone,
      email,
    } = this.state;

    const { chooseUser } = this.props;

    if (id === 0) {
      return (
        <Spinner />
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="CurrentUser__button button"
          onClick={() => chooseUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}
