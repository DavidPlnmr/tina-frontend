# Tina Frontend

## Getting started 

To set up your development environment for this project, the first step is to install Node.js. You can download the Node.js installer from its official website. Here's how:

1. Visit the official Node.js website at https://nodejs.org/.

2. You will see download links for Node.js. Choose the version that's appropriate for your system (Windows, Mac, Linux) and your needs. As a general rule, the LTS (Long Term Support) version is recommended for most users because it receives updates for an extended period. For this project, we use the version 18.15 of node.js

3. Download the installer and then run it on your machine. Follow the installation wizard's instructions. The Node.js installer will also install npm (Node Package Manager), which you will use to manage your project's dependencies.
After installing Node.js, you will be able to use the node and npm commands from your command line or terminal.

To check if node.js is installed : 
```bash
node -v
```

And to check if npm is installed : 
```bash
npm -v
```
## Install packages 

Use the following command to install all the dependencies required for the project. This should be run at the beginning after cloning the project and whenever a new package is added to the package.json file.

```bash
npm install
```
Sometimes, some packages do not install correctly.
In case you need to install a specific package, use the command below. Replace [name_of_the_package] with the name of the package you want to install.

```bash
npm install [name_of_the_package]
```

## Run the application

The npm run dev command starts the development server. This server comes with hot-reloading, meaning your changes will automatically reflect in your app without having to restart the server.

```bash
npm run dev
```

To create an optimized production build of your app, use the npm run build command. This command compiles your application and optimizes it for better performance in a production environment.
```bash
npm run build
```

## Generate the documentation

This section describes how to generate documentation for your code using JSDoc, a popular tool for creating comprehensive, structured documentation for JavaScript projects.

1. First, install JSDoc globally with the following command. This allows you to use the jsdoc command in any project.

    ```bash
    npm install -g jsdoc
    ```
2. Next, you should install JSDoc as a development dependency in your specific project. This ensures everyone working on the project uses the same version of JSDoc. To do this, navigate to your project directory and run:
    ```bash
    npm install --save-dev jsdoc
    ```
3. You should add a new script to your package.json file to facilitate the running of JSDoc. The example below names this script "docs", but you can choose a name that suits your project. Whenever you want to generate your documentation, you'll be able to run this script.
    ```json
    "scripts": {
        "docs": "jsdoc"
    }
    ```
4. Now you can generate your documentation using the jsdoc command along with a configuration file, which is usually named jsdoc.json. This file holds the settings JSDoc will use to generate your documentation.
    ```bash
    jsdoc -c jsdoc.json
    ```
The generated documentation is accessible at "tina/docs/index.html". This is a webpage that describes the functions and classes in your code, as well as any other comments you've included in the JSDoc style.