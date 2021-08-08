import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

const URL = 'https://mate-api.herokuapp.com';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.allData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.allData();
    }
  }

  getTodos = async() => {
    const response = await fetch(`${URL}/users/${this.props.userId}`);
    const result = await response.json();

    return result.data;
  };

  allData() {
    this.getTodos().then(user => this.setState({ user }));
  }

  render() {
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {this.state.user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.user.name}</h3>
        <p className="CurrentUser__email">{this.state.user.email}</p>
        <p className="CurrentUser__phone">{this.state.user.phone}</p>
        <button
          onClick={clearUser}
          className="TodoList__user-button
            TodoList__user-button--selected
            button"
          type="button"
        >
          Clear
        </button>
      </div>
    );
  }
}
CurrentUser.propTypes = {
  userId: PropTypes.string.isRequired,
  clearUser: PropTypes.func.isRequired,
};
