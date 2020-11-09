import React from 'react';
import { getUser } from '../../goods';
import './CurrentUser.scss';
import { CurrentUserShape } from '../Shapes/CurrentUserShape';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    this.changeUser();
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    this.changeUser();
  }

  changeUser = async() => {
    const { userId } = this.props;

    try {
      const user = await getUser(userId);

      this.setState({
        user,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }

  render() {
    const { userId, resetUserId } = this.props;
    const { name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={resetUserId}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = CurrentUserShape;
