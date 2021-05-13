# ☁️ Head in the clouds

[![CI/CD](https://github.com/pedro-rodalia/head-in-the-clouds/actions/workflows/main.yml/badge.svg)](https://github.com/pedro-rodalia/head-in-the-clouds/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/pedro-rodalia/head-in-the-clouds/branch/main/graph/badge.svg?token=D7O8ZEZPUA)](https://codecov.io/gh/pedro-rodalia/head-in-the-clouds)
[![Netlify Status](https://api.netlify.com/api/v1/badges/13d31973-47fb-469c-9a91-0c490499cf28/deploy-status)](https://app.netlify.com/sites/head-in-the-clouds/deploys)

React + Redux based SPA for the IOMED Technical interview

![alt text][showcase]

## TODOs:

- Technical requirements

  - [x] Build a React SPA (using, for instance, ​https://create-react-app.dev/​)
  - [x] Install the Elastic UI framework (​https://github.com/elastic/eui/blob/master/wiki/consuming.md​)
  - [x] Use ​redux​ as a state manager.
  - [x] Use redux-saga to manage the persistence module.
  - [x] Upload the app source code to Github.
  - [x] Make the website available through Netlify.
  - [x] Test the application functionallity.
  - [x] (Optional) Use ​reduxjs-reselect​ to enhance the state management.
  - [x] (Optional) Use react-router to manage routing.

- Functional requirements

  - [x] Implement a functionallity that allows the user to select a city from a collection of cities. The user should be able to search asynchronously throughout the collection of cities. (https://elastic.github.io/eui/#/forms/combo-box)
  - [x] Show information regarding the selected cities weather within a Card (https://elastic.github.io/eui/#/display/card). The card should display the `name`, the `temperature` and the `chance of precipitation`. This data can be obtained from the [el-tiempo.net](el-tiempo.net) API. The card should also display a button that allows its removal from the set of cards.
  - [x] The user should be able to save a search result (multiple cities if needed) so that when the user comes back online he/she will be able to go through these saved results.
  - [x] The app must allow the user to register and login in order to save collections of results.
  - [x] The user must be able to sort and delete saved search results.

[showcase]: .github/showcase.png
