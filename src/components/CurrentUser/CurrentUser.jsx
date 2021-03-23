import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    currUser: null,
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      const data = await getUsers(`${this.props.userId}`);

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
            <h3 className="CurrentUser__name">{currUser.name}</h3>
            <p className="CurrentUser__email">{currUser.email}</p>
            <p className="CurrentUser__phone">{currUser.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.props.clearHandler}
            >
              Clear
            </button>
          </>
        ) : 'No user selected'}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearHandler: PropTypes.func.isRequired,
};
