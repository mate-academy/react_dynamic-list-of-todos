import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUserDatas } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    const usersFromServer = await getUserDatas(this.props.userId);

    this.setState({ user: usersFromServer.data });
  }

  async componentDidUpdate(previousProps) {
    const usersFromServer = await getUserDatas(this.props.userId);

    if (previousProps.userId !== usersFromServer.data.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ user: usersFromServer.data });
    }
  }

  render() {
    const { userId, onChange } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <button
            className="CurrentUser__clear"
            type="button"
            onClick={() => {
              onChange(userId);
            }}

          >
            Clear
          </button>
          <span>
            Selected user:
            &nbsp;
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
