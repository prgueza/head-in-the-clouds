# Whats The Weather Like!

React + Redux based SPA for the IOMED Technical interview

## TODOs:

- Technical requirements

  - [x] Build a React SPA (using, for instance, ​https://create-react-app.dev/​)
  - [x] Install the Elastic UI framework (​https://github.com/elastic/eui/blob/master/wiki/consuming.md​)
  - [x] Use ​redux​ as a state manager.
  - [ ] Use redux-saga to manage the persistence module.
  - [x] Upload the app source code to Github.
  - [ ] Make the website available through Netlify.
  - [ ] Test the application functionallity.
  - [ ] (Optional) Use ​reduxjs-reselect​ to enhance the state management.

- Functional requirements

  - [ ] Implement a functionallity that allows the user to select a city from a collection of cities. The user should be able to search asynchronously throughout the collection of cities. (https://elastic.github.io/eui/#/forms/combo-box)
  - [ ] Show information regarding the selected cities weather within a Card (https://elastic.github.io/eui/#/display/card). The card should display the `name`, the `temperature` and the `chance of precipitation`. This data can be obtained from the [el-tiempo.net](el-tiempo.net) API. The card should also display a button that allows its removal from the set of cards.
  - [ ] The user should be able to save a search result (multiple cities if needed) so that when the user comes back online he/she will be able to go through these saved results.
  - [ ] The app must allow the user to register and login so the results save must be user dependent.
  - [ ] The user must be able to sort and delete saved search results.
