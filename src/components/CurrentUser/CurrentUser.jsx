import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.PureComponent {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getUser(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (<span>Loading data from server...</span>);
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
        <p className="CurrentUser__email">{user.email }</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="submit"
          className="CurrentUser__button"
          onClick={() => {
            this.props.selectUser(null);
          }}
        >
          Close
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
}).isRequired;
