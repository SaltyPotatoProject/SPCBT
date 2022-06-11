import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

/** Renders a single row in the List Expenses table. See pages/ListExpenses.jsx. */
const ListExpenses = ({ expense }) => (
  <tr>
    <td>{expense.owner}</td>
    <td>{expense.name}</td>
    <td>{expense.amount}</td>
  </tr>
);

// Require a document to be passed to this component.
ListExpenses.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListExpenses;
