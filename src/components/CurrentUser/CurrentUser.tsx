/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api';

interface Props {
  userId: number;
  handleClearUser: () => void;
}

interface State {
  name: string,
  id: number,
  email: string,
  phone: string,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    name: '',
    id: 0,
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    try {
      const user = await getUserById(this.props.userId);

      this.setState({
        name: user.name, id: user.id, email: user.email, phone: user.phone,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {
      name, id, email, phone,
    } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          className="button"
          type="button"
          onClick={this.props.handleClearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}
