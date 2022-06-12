import { Meteor } from 'meteor/meteor';
import { Expenses } from '../../api/expenses/Expenses.js';
import { Employees } from '../../api/employee/Employee.js';
import { Stuffs } from '../../api/stuff/Stuff.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addExpenses(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Expenses.collection.insert(data);
}

// Initialize the ExpensesCollection if empty.
if (Expenses.collection.find().count() === 0) {
  if (Meteor.settings.defaultExpenses) {
    console.log('Creating default data.');
    Meteor.settings.defaultExpenses.map(data => addExpenses(data));
  }
}

function addEmployees(data) {
  console.log(`  Adding: ${data.owner} (${data.Expenses})`);
  Employees.collection.insert(data);
}

// Initialize the EmployeesCollection if empty.
if (Employees.collection.find().count() === 0) {
  if (Meteor.settings.defaultEmployees) {
    console.log('Creating default employees.');
    Meteor.settings.defaultEmployees.map(data => addEmployees(data));
  }
}
