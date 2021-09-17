import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type State = {
  userName: string;
  email: string;
  phone: string;
};

type Props = {
  selectedUserId: number;
  resetUser: () => void;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    userName: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.changeUser();
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.selectedUserId !== this.props.selectedUserId) {
      this.changeUser();
    }
  }

  changeUser = () => {
    getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({
          userName: user.name,
          email: user.email,
          phone: user.phone,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{this.props.selectedUserId}</span></h2>

          <h3 className="CurrentUser__name">{this.state.userName}</h3>
          <p className="CurrentUser__email">{this.state.email}</p>
          <p className="CurrentUser__phone">{this.state.phone}</p>
        </div>
        <button
          type="button"
          onClick={() => this.props.resetUser()}
          className="btn btn-outline-danger button--reset"
        >
          Reset
        </button>
      </div>
    );
  }
}
