# Pomodoro App clone

This is a simple clone of the a Pomodoro application. 

### (Over)simplifications

Since the purpose of this app was to play a bit with React hooks, context and Firebase integration, without getting too much into the any specific business logic details, there are some simplifications with regards to Firebase sync:

 - The app doesn't try to handle lost connections and eventual discrepancies between when the user is signed in and not
 - The logic for tasks is very simple - if the user is logged in, handle the action async through Firebase, otherwise handle it with a plain action in memory. No additional checks are made.