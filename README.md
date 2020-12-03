# Viewing the app

The app is hosted at [pollify.xyz](http://localhost:3000). To download a copy of the source code and run the app locally, follow the instructions in the "Running app locally" section.

# Running app locally

First, make sure to clone the repository to your system. Make sure you have git installed, then navigate to the directory you want to clone the repository. Then run the command:

`git clone https://github.com/ethankeshishian/poll-web-app.git`

This will create a new directory named "poll-web-app" that will contain the project's source code.

## Installing Dependencies

To install dependencies, make sure you have npm installed, then navigate to the directory with a terminal using the `cd <your directory>` command. Then, run the command `npm install` to install all dependencies.

## Running the app

To see the app in your web browser, run `npm start` or `yarn start` and navigate to [http://localhost:3000](http://localhost:3000) in your browser. The page will reload if you make edits.

# Publishing backend

You should now be able to see the app. The app is already connected to our backend. To publish the commands in the `/amplify` folder to the cloud and build a new backend, continue reading.

## To create a remote environment

Run the `amplify env add` command and answer the prompt as follows:

```
? Do you want to use an existing environment?
No

? Enter a name for the environment [dev|test|prod]

? Do you want to use an AWS profile? Yes

? Please choose the profile you want to use (default)

Enter your Google Web Client ID for your OAuth flow: XXX

Enter your Google Web Client Secret for your OAuth flow: XXX
```

## To create resources on AWS

Run the `amplify push` command and answer the prompt as follows:

```
? Are you sure you want to continue? Yes
```
