import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const User = ({ name }) => <Table.Cell>{name}</Table.Cell>;

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
