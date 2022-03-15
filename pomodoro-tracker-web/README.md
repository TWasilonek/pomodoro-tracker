# Pomodoro App clone

This is a simple clone of a Pomodoro application written


## Design

The design was inspired by existing and popular applications used to follow the pomodoro technique. 

## Features

 - CRUD for tasks and pomodoros
 - Signup and login with Firebase auth (Google Auth only)
 - Automatic breaks between _pmodoros_
 - Basic sync of visible tasks when going in online mode
 - Supports both online and offline tasks and pomodoro tracking (but tasks are persistent between sessions only when logged in)

## Tech

 - Create React App + Typescript
 - Firebase (Auth and Firestore)
 - State managed in React Context using the reducer pattern (no libs, just `useReducer` hook)
