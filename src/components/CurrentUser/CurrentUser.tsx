import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

type Props = {
  userId: number;
  onClearUser: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser(this.props.userId);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.loadUser(this.props.userId);
    }
  }

  loadUser = async (id: number) => {
    await getUserById(id).then(serverUser => {
      this.setState({
        user: { ...serverUser },
      });
    }).catch(() => {
      this.setState({
        user: null,
      });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        {
          user
            ? (
              <>
                <h2 className="CurrentUser__title">
                  <span>
                    Selected user:
                    {user?.id}
                  </span>
                </h2>

                <h3 className="CurrentUser__name">
                  {user?.name}
                </h3>
                <p className="CurrentUser__email">
                  {user?.email}
                </p>
                <p className="CurrentUser__phone">
                  {user?.phone}
                </p>
              </>
            )
            : (
              <span>
                Can not find a User
              </span>
            )
        }
        <br />
        <button
          className="button"
          type="button"
          onClick={this.props.onClearUser}
        >
          Clear
        </button>

      </div>
    );
  }
}
