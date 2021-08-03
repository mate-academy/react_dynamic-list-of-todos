import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    currentUser: null,
  }

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ currentUser: user });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      const user = await getUser(this.props.userId);

      this.setState({ currentUser: user });
    }
  }

  clear = () => {
    this.setState({ currentUser: null });
    this.props.clearUser(0);
  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      return (<p>Loading</p>);
    }

    return (
      <div className="CurrentUser">
        {this.state.currentUser !== null && (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${currentUser.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{currentUser.name}</h3>
            <p className="CurrentUser__email">{currentUser.email}</p>
            <p className="CurrentUser__phone">{currentUser.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.clear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}
