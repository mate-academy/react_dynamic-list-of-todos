import React from 'react';
import './CurrentUser.scss';

import { request } from '../../api';
import { CurrentUserShape } from '../shapes/CurrentUserShape';

const initialState = {
  id: null,
  name: '',
  email: '',
  phone: '',
};

export class CurrentUser extends React.PureComponent {
  state = {
    ...initialState,
  };

  componentDidMount() {
    this.getUser(this.props.userId);
  }

  componentDidUpdate(prevState) {
    if (this.state.id !== prevState.id) {
      this.getUser(this.props.userId);
    }
  }

  getUser = (userId) => {
    request(`./users/${userId}`).then((user) => {
      if (!user.data) {
        this.setState({
          ...initialState,
        });

        return;
      }

      const { id, name, email, phone } = user.data;

      this.setState({
        id,
        name,
        email,
        phone,
      });
    });
  };

  render() {
    const { name, id, email, phone } = this.state;

    return (
      id ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={this.props.clearUser}
          >
            Clear
          </button>
        </div>
      ) : (
        <div>User not found</div>
      )
    );
  }
}

CurrentUser.propTypes = CurrentUserShape;
