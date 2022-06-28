[![ci-meteor-application-template-react](https://github.com/ics-software-engineering/meteor-application-template-react/actions/workflows/ci.yml/badge.svg)](https://github.com/ics-software-engineering/meteor-application-template-react/actions/workflows/ci.yml)

For details, please see http://ics-software-engineering.github.io/meteor-application-template-react/


Formal Report

A. INTRODUCTION
Team Name:  SaltyPotato
Team Members: Ujjwal Gautam, Robert Cardinalli, Li Liang, Nanami Kimoto
Application Title: SaltyPotato Corporate Budget Tracker (SPCBT)
Description: The SPCBT is the most accessible and user-friendly app designed to help employees/employers track the budget and expenses of small/large enterprises. The app provides authentication features where the users can only log in using the credential provided by the admin/manager of the application. The login passwords are kept secured/encrypted in the database. Only admins would have the privilege to allocate a budget for users. The budget allocated to each user and their expenses are kept private, and no user other than the admin can track the details of other users. The manager can reduce/increase the budget for employees, and the employees' expenses are limited to the allocated budget.
          Function Requirement Specification
User Login and Registration(admin only)
View and Modify Expenses
Allocate Budget(admin only)
Track expenses of all users(admin only)
Remove Users(admin only)
Type of program:  Locally Hosted Web App
Development Tools: 
Javascript, 
React,
MeteorJS,
MongoDB
VS code,
Github


B. REQUIREMENTS
1. Security and Privacy Requirements:
Information private to the users, such as login passwords, budget, and expenses, are kept confidential and secured.
Only admins would be privileged to update the budget and create/remove users.
Users can only log in using the credentials provided to them by the admin.
Implementing proper data validation/sanitization to protect the application from malicious activities.
- Also, come up with a system of keeping track of security flaws that may arise throughout the development process. Describe this plan/system in your report.
Issue tickets will be issued into the GitHub project board for known security flaws.

2. Quality Gates (or Bug Bars):
 Define levels of security and privacy for your program.
- Here are some samples:privacy, security. Your security gates/bug bars do not have to be as complex, but you should choose which situations would apply to your program.
- No sign up ability, admin must assign initial login for company user
Only 1 admin (no password sharing for admin)
Admin should also handle IT (?) to limit needed to give a separate IT company staff member admin credentials 

3. Risk Assessment Plan for Security and Privacy:
- Determine how you will assess security and privacy and which parts of your program need threat modeling and security reviews. Here is a template example.
Program testing to check for exposed data 
All authorized users will require a @saltypotatocompany email address to login
   

C. DESIGN
1. Design Requirements:
- Decide on a set of design requirements. Look back to the privacy and security requirements in section B part 1 as well as the functionality described in section A part 3. What design features should you implement to make sure that you meet those functional and security requirements as specified?

Design should be simple. This is a program designed for authorized personnel of the SaltyPotatoCompany only. Therefore, the landing page should immediately be a login. (similar to meta or linkedin that require you to login right away to use)
This is a budget tracker only, meaning that upon login it should direct to the options for budget tracker that are available to authorized users. Admin users will have additional options. 
2. Attack Surface Analysis and Reduction:
- Determine privilege levels for your users and perform an attack surface analysis.
Average SaltyPotatoCompany users should not be allowed to perform attack surface analysis, this is something that should be reserved for admin personnel only. 
Need to make user basic users cannot give themselves admin privilege. 
Need to make sure data CANNOT be exported out 

- Since this is the first version of your program, compile a list of vulnerabilities based on a similar program. Using a similar program as a vulnerability reference will give you an idea of how your program may be vulnerable. Consider the ways a malicious user may attempt to exploit the code or other aspects of the program.

Broken Authentication
Sensitive Data Exposure
Broken Access Control
Security Misconfiguration
Phishing

3. Threat Modeling:

Spoofing
Broken Access Control
Security Misconfiguration

Information Disclosure
Sensitive Data Exposure
Phishing

Elevation of Privilege
Broken Authentication

 D. Implementation
Approved Tools		
Tools/Framework
Version
Visual Studio Code
1.67.2
Bootstrap
5.2.0
React
18.1.0
React-DOM
18.1.0
React-Router
6.3.0
Meteor-Node-Stubs
1.2.3
Git
2.35.1
HTML
5
Uniforms
3.9.1


Deprecated/Unsafe functions
componentWillMount() : 
	This is a react lifecycle method that is deprecated and marked as unsafe due to excessive misuse and causing problems with asynchronous rendering.
            The alternative is to use a functional component and implement React Hooks to make the component stateful.

			String.prototype.fontsize() :
 				This method creates a <font> HTML element that displays the 
			String in a specified font size. <font> element has been removed in HTML5.
				 The alternative is to use CSS font properties.

 

   
Static Analysis
Tools
Version
Eslint
8.16.0
Eslint-config-airbnb
19.0.4
eslint-plugin-meteor
7.3.0
eslint-plugin-react
7.30.0
eslint-plugin-jsx
0.1.0

				
ESLint is the static analysis tool we decided to use for this project. ESLint identifies bugs and errors in the program by comparing them with the configured rules. As a result, it helps to follow a set of defined rules which increases the readability and purity of the code.
			
E. Verification
Static Analysis Review
Eslint allows us some static analysis tools, here is how we are using them:  
Control Analysis– Our functions don’t have any errors and our program is built on JavaScript functions. We are using a template and running our program as a locally hosted application that involves MongoDB and Meteor use with JavaScript functions. We have initiated testing and security protocols built into our meteor template for JavaScript. 

Data Analysis– Our data is controlled on the backend by MongoDB, a local database program. Our application works by having administrative users that can add or remove regular users. We have a data / security protocol that requires anyone requesting an account via the sign up will have to have a specific email address. This makes sure our data only contains those specific email addresses and none outside of the company. 

Failure Analysis– We designed this application to have a very simple interface and is for the purpose of internal company use. The simple components allow us to keep the possibility of failure at a smaller rate. Most of the failures that could be associated with the application would be user errors or dependency errors. Dependency errors happen when the correct tools are not installed by the user for everything in the application to run. 

Interface Analysis– Each member has access to the program and we all download a version to locally test run on our machines. Ideally, this should be done after any major change to the program. Our current program design and use fits into our original design concept. 
Dynamic Analysis Review: 
We have decided to use TestCafe for Meteor instead of the tools we were looking at previously. TestCafe has very easy continuous testing and integration into Meteor. We have five standard tests while the application is running. These tests include sign in page, sign up page, sign out page, navigation page, and landing page. TestCafe will go through each page specified and make sure it shows up and works properly. 


Fuzz Testing
https://github.com/ffuf/ffuf 
FFUF was run using recommended word lists, compiled by SecLists: https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content 
directory-list-1.0.txt
directory-list-2.3-medium.txt
directory-list-2.3-big.txt
directory-list-lowercase-2.3-medium.txt
Directory-list-lowercase-2.3-big.txt

This is an automated testing system in which you can specify what you want it to test for. FFUF is a mutator designed to produce test cases for your software. In this case we can use brute force on our application while running in the local host to test for specific information like status, calibration, timeout, threads, and others. We used it to handle authentication and generally scanning for errors. Scanning for vulnerabilities, reducing complexity, and using the zero-trust policy is how we are handling attack surface reduction.

Attack Surface Review:
Our current attack surface is mostly centered on access to our github repository. Although our repository is public, you cannot make unauthorized changes to the application unless you are a member of the designated staff. We have one creating member who can actually revoke all access to the others if necessary (in the event one of them were compromised). 

In terms of the actual application, since a copy of it can be downloaded it can be edited and changed on another individual’s computer, but the original never changes. This is one of the benefits of having a locally hosted application. Since it isn’t deployed, there isn’t constant data going through the application, so there is nothing for attackers to pull from the original that we weren’t already willing to show. 
Currently, there is standard encryption already given through bcrypt which comes default on meteor. This automatically encrypts user passwords. Our injection vulnerabilities and data validation is taken care of by the prototypes and schema of MongoDB. 
Ideally, the repository of this application would be private with very limited access by specific IT administrators only. This means that even at the salty Potato Company, everyday employees would not have access to the repository. If we locally host it on a work computer they may use the running application to request a username and sign-in, which then must be approved by administrative staff. 

F. Release - Final Security Review, Incident Response Plan, Archive Report, User Guide
Final Security Review
Security Review
We have conducted Static Analysis (Control, Data, Failure, and Interface Analysis) as previously described. No detected errors are unaddressed. We used Meteor TestCafe for Dynamic Analysis. No TestCafe tests were failed. Quality gates are successfully met:


Admin must assign initial login for company user
A single admin account is being utilized
Admin expected to be IT focused

We ran Fuzz Faster U Fool (FFUF) for fuzz testing. No errors or unexpected behaviors were detected. 

No known updates were needed to the threat model.

Rating
The program as is should be rated Passed FSR with exceptions. The program passes all identified tests. There are no known security deficits in authentication or data management. Currently, no function enabling the admin to remove an account once created has been implemented. Pending the implementation of such a feature, this release passes only with exceptions.
Certified Release and Archive Report

The release for Salty Potato Corporate Budget Tracker can be found here:
https://github.com/SaltyPotatoProject/SPCBT/releases/tag/v1.0

Summary of Features
Secure login and registration
Allocating budget
Showing historical expenses and available balance
Version Number: SPCBT is at v1.0
Future Development Plan
Removing Users
Deallocating budget

Installation
To install the SPCBT app, the user must have nodeJS installed on their local machine. Here is the link to install nodeJS https://nodejs.org/en/download/.
Once you have nodeJS installed, clone the below repository to your local machine.
https://github.com/SaltyPotatoProject/SPCBT.git
Next, go to the app folder and type the following commands
"npm install " to install the required dependencies
"meteor npm run start" to run the application locally
Next, on the browser, the application loads at http://localhost:3000/ 

Incident Response Plan
Privacy Escalation Team-
Security Engineer: Robert Cardinalli
Our security engineer will handle any issues regarding the security of our application. This includes access outside of the application as well as from within. Our security engineer will handle all final testing stages and any security alerts that cannot be handled automatically. 
Escalation Manager: Ujjwal Gautam
Our escalation manager will handle security cases that need to move beyond auto-fix or simple solutions. If there is a deeper concern for a certain alert, our escalation manager will investigate and open an official case with tickets assigned to specific members. 
Public Relations Representative: Li Liang
Our public relations representative will deal with any media situations as well as write-up formal reports that can be given to the general public on any incidents. 
Legal Representative: Nanami Kimoto
Our legal representative will handle all situations involving legal licensure, use, and copyright. You may contact our legal representative with questions on this application or our team. 
Contact: nkimoto@SPCBT.com

Incident Handling Procedures:
Ping security engineer
Contain access to github and any servers
Segmentation of code for debugging
Start an official incident report
Keep thorough documentation of issue and debug process
