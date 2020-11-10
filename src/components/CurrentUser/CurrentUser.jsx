import React from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../../api';
import './CurrentUser.scss';

class CurrentUser extends React.PureComponent {
  state = {
    user: {},
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
    const user = await getUserById(this.props.userId) || {};

    this.setState({
      user,
    });
  }

  render() {
    const { id, userId, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {id || userId || 'Unknown'}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {name || 'No name'}
        </h3>
        <p className="CurrentUser__email">
          {email || 'No email'}
        </p>
        <p className="CurrentUser__phone">
          {phone || 'No phone'}
        </p>

        <button
          type="button"
          className="CurrentUser__button button"
          onClick={this.props.onClear}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

export { CurrentUser };
