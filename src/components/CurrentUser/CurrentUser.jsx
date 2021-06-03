import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({
      user: user.data,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      const user = await getUser(this.props.selectedUserId);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ user: user.data });
    }
  }

  render() {
    const { user } = this.state;
    const { selectUser } = this.props;

    if (!user) {
      return 'fnfn';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="
            CurrentUser__clear
          "
          type="button"
          onClick={() => {
            selectUser(0);
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
