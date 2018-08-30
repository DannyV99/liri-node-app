var inquirer = require('inquirer');

inquirer
    .prompt([

        {
            type: "checkbox",
            name: "question1",
            message: "Please choose One.",
            choices: ['Songs', 'Concerts', 'Movie'],
        }
    ]).then(function (response) {
        if (response.question1 === 'Songs') {
            runSpotify();
        } else if (response.question1 === 'Concerts') {
            runBandsintown();
        } else if (response.question1 === 'Movie') {
            runMovies()
        }
    })