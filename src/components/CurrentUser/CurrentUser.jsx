import React from 'react';
import './CurrentUser.scss';

const usersUrl
  = 'https://mate-api.herokuapp.com/users/';

const getUsers = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data);
};

export class CurrentUser extends React.Component {
  state = {
    currUser: null,
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      const data = await getUsers(`${usersUrl}${this.props.userId}`);

      this.setState({
        currUser: data,
      });
    }
  }

  render() {
    const { userId } = this.props;
    const { currUser } = this.state;

    return (
      <div className="CurrentUser">
        {currUser ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${userId}`}
              </span>
            </h2>
              <>
                <h3 className="CurrentUser__name">{currUser.name}</h3>
                <p className="CurrentUser__email">{currUser.email}</p>
                <p className="CurrentUser__phone">{currUser.phone}</p>
              </>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={() => this.props.clearHandler()}
            >
              Clear
            </button>
          </>
        ) : 'No user selected'}
      </div>
    );
  }

};
