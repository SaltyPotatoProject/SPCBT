import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Expenses table. See pages/ListExpenses.jsx. */
const ListExpenses = ({ budget }) => (
  <tr>
    <td>{budget.owner}</td>
    <td>{budget.name}</td>
    <td>{budget.amount}</td>
    {/* <td>
      <Link to={`/edit/${budget._id}`}>Edit</Link>
    </td> */}
  </tr>
);

// Require a document to be passed to this component.
ListExpenses.propTypes = {
  budget: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListExpenses;
