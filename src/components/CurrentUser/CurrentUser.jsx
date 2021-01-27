import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserbyId } from '../../api';

const initialUser = {};
const notFoundUser = {
  name: 'not found',
  email: 'not found',
  phone: 'not found',
};

export class CurrentUser extends React.Component {
  state = {
    user: initialUser,
    userId: 0,
  }

  async componentDidMount() {
    const person = await getUserbyId(this.props.userId);

    this.setState({ user: person.data });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { userId } = this.props;

    if (prevState.userId !== userId) {
      const person = await getUserbyId(userId);

      if (person.data !== null) {
        this.chooseNewUser(person.data);
      } else {
        this.chooseNewUser({
          ...notFoundUser,
          id: userId,
        });
      }
    }
  }

  chooseNewUser = (person) => {
    this.setState({
      user: person,
      userId: person.id,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user?.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </div>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
