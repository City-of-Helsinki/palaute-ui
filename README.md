# Palaute-ui-beta

## Requirements

* node.js (for npm package management and node-sass) https://nodejs.org

* Gulp and Gulp CLI (for running Gulp tasks) http://gulpjs.com

* Bower for web component dependency management https://bower.io

* Json-server for serving data via http during development stage https://github.com/typicode/json-server

## Structure

* package.json contains specifications to be used when using node package management

* bower.json contains specifications on the third party components used in the web application

* gulpgile.js contains tasks that are run to optimize and distribute the web application

* dist/ contains the distributed contents as a result from running gulp tasks (not to be stored into a version control system)

* bower_components/ contains the third party components (not to be stored into a version control system)

* app/ contains the actual source files

* app/fonts/ contains the font files

* app/images/ contains the image files

* app/scripts/ contains all the javascript files

* app/styles/ contains all the css files

* app/views/ contains all the html files

* app/index.html the entry file into the application

## Development environment setup

1. Install Node.js
2. Go to project root and issue the command: 'npm install'
3. Install bower by issuing the command: 'npm install -g bower'
4. Download json-server and start it up by issuing the command: 'json-server --watch db.json -p 1234' (db.json is the data file and 1234 is the port)
5. In the project root foler issue the command: 'gulp watch'
6. Application should appear in a browser window

