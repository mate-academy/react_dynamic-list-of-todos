import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  chooseUser: (userId: number) => void;
}

type State = User;

export class CurrentUser extends React.Component<Props, State> {
  state = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const { selectedUserId } = this.props;
    const user: User = await getUser(selectedUserId);

    this.setState({ ...user } as User);
  }

  render() {
    const {
      id,
      name,
      phone,
      email,
    } = this.state;

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
          className="button CurrentUser__button"
          onClick={(event) => {
            event.preventDefault();
            this.props.chooseUser(0);
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}
