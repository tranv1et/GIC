# GIC

Your job is to design and implement a _single-page web application_ GUI that handles user input and output. The following writeup and sample input/output are CLI representation of the UI. You should adapt them to suitable web interface accordingly.

There is no requirement to integrate with a backend service nor external database.

Your UI should be aesthetically pleasing, styled properly, consistent, and intuitive. The code pertaining to styling should be structured idiomatically as per your chosen framework / library.

It is highly preferable to provide automated tests in your solution.

## Features

You're designing a simple banking system that handles operations on bank accounts. At the moment, your system is capable of three features:

-   depositing an amount
-   withdrawing an amount
-   printing account statement

When account is created, its balance is 0.

When launching the application, it prompts user for actions:

```
Welcome to AwesomeGIC Bank! What would you like to do?
Deposit
Withdraw
Print statement
Quit
```

User should be to select any of the options from the UI.

## Installation

```sh
# Clone the repository
git clone https://github.com/tranv1et/GIC.git

# Navigate to the project directory
cd your-repo

# Install dependencies
npm install

# Run project
npm run dev

# Run unit tests
npm run test
```
