import React from 'react';
import { User } from '../../types/types';
import { getUser } from '../../api/api'
import './CurrentUser.scss';

type Props = {
  userId: number;
  onClear: () => void;
}

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  }

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user })
  }

  render() {
    const { onClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>Selected user: {this.props.userId}</span></h2>

        <h3 className="CurrentUser__name">{this.state.user?.name}</h3>
        <p className="CurrentUser__email">{this.state.user?.email}</p>
        <p className="CurrentUser__phone">{this.state.user?.phone}</p>

        <button
          type="button"
          onClick={() => onClear()}
        >
          Clear
        </button>
      </div>
    )
  }
};
