import { Meteor } from 'meteor/meteor';
import { Budget } from '../../api/budget/Budget.js';
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

function addBudget(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Budget.collection.insert(data);
}

// Initialize the BudgetCollection if empty.
if (Budget.collection.find().count() === 0) {
  if (Meteor.settings.defaultBudget) {
    console.log('Creating default data.');
    Meteor.settings.defaultBudget.map(data => addBudget(data));
  }
}

function addEmployees(data) {
  console.log(`  Adding: ${data.owner} (${data.budget})`);
  Employees.collection.insert(data);
}

// Initialize the BudgetCollection if empty.
if (Employees.collection.find().count() === 0) {
  if (Meteor.settings.defaultEmployees) {
    console.log('Creating default employees.');
    Meteor.settings.defaultEmployees.map(data => addEmployees(data));
  }
}