# Pomodoro App clone

## Design

The design was inspired by existing and popular applications used to follow the pomodoro technique. 

<p float="left">
  <img src="https://i.imgur.com/em0UfnG.jpg" alt="Pomodoro view" width="200"/>
  <img src="https://i.imgur.com/h7aCkyu.jpg" alt="Task menu" width="200"/>
  <img src="https://i.imgur.com/BKtb8lk.jpg" alt="Break view" width="200" />
</p>

## Features

 - CRUD for tasks and pomodoros
 - Signup and login with Firebase auth (Google Auth provider)
 - Automatic breaks between _pmodoros_
 - Basic sync of visible tasks when going in online mode
 - Supports both online and offline tasks and pomodoro tracking (but tasks are persistent between sessions only when logged in)

## Tech

 - Create React App + Typescript
 - Firebase (Auth and Firestore)
 - State managed in React Context using the reducer pattern (no libs, just `useReducer` hook)

## Local development

### Node

This project has been created with Node v16. It is recommended to use the same version to avoid any issues.

### Firebase (authentication and firebastore).

If you want to run this project locally, you need to create your own Firebase project, enable the required services and setup the Firebase CLI.

1. Create a Firebase project
2. Enable Authentication
3. Enable Firestore and create a default database
4. Create a Web App, and Firebase will show you all the config variables
5. In the root of this project (`pomodoro-tracker-web`) create an `.env` file, copy to it the contents of `.env.example` and put your firebase config variables in the respective env vars.
6. If you don't have it already install the [Firebase CLI](https://firebase.google.com/docs/cli) globally
7. Login to your Firebase CLI account - run `firebase login`
8. In the terminal go to this monorepo [firebase directory](https://github.com/TWasilonek/pomodoro-tracker/tree/main/firebase)
9. Change the project id in `firebase/.firebaserc` to yours project id
10. cd to the [functions directory](https://github.com/TWasilonek/pomodoro-tracker/tree/main/firebase/functions) and run `npm install && npm run build`
11. Run `firebase deploy` (this will deploy configs, ex. firestore rules) 

### React 

This project has been created with a standard [Create React App](https://create-react-app.dev/) typescript setup.

1. Run `npm install` to install dependencies
2. Run `npm start` to start the application locally
3. Run `npm test` to run unit tests