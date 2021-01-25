import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserbyId } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
    userId: 0,
  }

  async componentDidMount() {
    const person = await getUserbyId(this.props.userId);

    this.setState({ user: person.data });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.userId !== this.props.userId) {
      const person = await getUserbyId(this.props.userId);

      this.chooseNewUser(person.data);
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
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
