// This code was created using a number of sources and tools, including the repositories of some of my classmates, online forums, and with the assistence of ChatGPT and GithubCopilot.

const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions for your project?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage information for your project?',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'What are the guidelines for contributing to your project?',
    },
    {
        type: 'input',
        name: 'test',
        message: 'What are the test instructions for your project?',
    }
];

// TODO: Create a function to write README file
function writeToFile(response) {
    let fileName = './README.md';
    const readmeContent = `
# ${response.title} 

${renderLicense(response.license)}

## Description

${response.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Test](#test)
* [Questions](#questions)

## Installation
To install the necessary dependencies, run the following command:
\`\`\`
${response.installation}
\`\`\`

## Usage

${response.usage}

${renderLicenseSection(response.license)}

## Contribution

${response.contribution}

## Test
To run tests run the following command:
\`\`\`
${response.test}
\`\`\`

## Questions
If you have any questions about the repo, open an issue or contact me directly at ${response.email}. You can find more of my work at [${response.github}]

`;


    fs.writeFile(fileName, readmeContent, (err) =>
        err ? console.error(err) : console.log('Success!')
    );

}

// Initialize app
function init() {
    inquirer.prompt(questions).then((response) => {
        writeToFile(response);
    })
 }

// Function to generate markdown for README
function renderLicense(license) {
    /* this extract of code was repurposed from Alex Trejo's repository */
    if (license == 'None') {
        return ''
    } else {
        return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`
    }
}

// Function to hide the license in case the user chose not to include one
function renderLicenseSection(license) {
    if (license == 'None') {
        return ''
    } else {
        return `## License
        This project is licensed under the ${license} license.`
    }
}

// Function call to initialize app
init();
