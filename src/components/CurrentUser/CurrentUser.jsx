import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    const user = await this.getUser();

    this.setUser(user);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      const user = await this.getUser();

      this.setUser(user);
    }
  }

  setUser = (user) => {
    this.setState({ user: { ...user.data } });
  }

  // eslint-disable-next-line
  getUser = () => fetch(`https://mate-api.herokuapp.com/users/${this.props.userId}`)
    .then(response => response.json());

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          onClick={this.props.clear}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
