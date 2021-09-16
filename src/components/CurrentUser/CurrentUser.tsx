import React from 'react';
import { loadUser } from '../../api';

import './CurrentUser.scss';

interface Props {
  userId: number;
}

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    // const user = await loadUser(this.props.userId);

    // this.setState({
    //   user,
    // });
    this.loadUser2();
  }

  loadUser2 = async () => {
    const user = await loadUser(this.props.userId);

    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <p>
          error
        </p>
      );
    }

    return (

      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}
