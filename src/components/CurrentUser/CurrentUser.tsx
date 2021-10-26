import React from 'react';

import './CurrentUser.scss';

import getData from '../../api';

type Props = {
  userId: number,
  clear: (x: number) => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadInfo(`/users/${this.props.userId}`);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadInfo(`/users/${this.props.userId}`);
    }
  }

  loadInfo = (link: string) => {
    getData(link)
      .then((user: User) => {
        this.setState({
          user,
        });
      });
  };

  render() {
    const { user } = this.state;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{user.website}</span></h2>
            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
            <button
              className="CurrentUser__button"
              type="button"
              onClick={() => this.props.clear(0)}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}
