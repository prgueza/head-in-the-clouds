![alt text][showcase]

# ☁️ Head in the clouds

[![CI/CD](https://github.com/pedro-rodalia/head-in-the-clouds/actions/workflows/main.yml/badge.svg)](https://github.com/pedro-rodalia/head-in-the-clouds/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/pedro-rodalia/head-in-the-clouds/branch/main/graph/badge.svg?token=D7O8ZEZPUA)](https://codecov.io/gh/pedro-rodalia/head-in-the-clouds)
[![Netlify Status](https://api.netlify.com/api/v1/badges/13d31973-47fb-469c-9a91-0c490499cf28/deploy-status)](https://app.netlify.com/sites/head-in-the-clouds/deploys)

React + Redux based SPA for the IOMED Technical interview

> Disclaimer: At the time of writing this readme.md my keyboard is crazy and tends to repeat letters and whitespaces so small typos might be found within 🤦🏼‍♂️

## ⚙️ Quick start

```bash
desktop:$ git clone https://github.com/pedro-rodalia/head-in-the-clouds.git head-in-the-clouds
desktop:$ cd head-in-the-clouds
head-in-the-clouds:$ npm i
head-in-the-clouds:$ npm start
```

## 📙 Description

[Head in the clouds](https://head-in-the-clouds.netlify.app/) is a web app developed using _React_ that allows a user to search for any Spanish town and check the weather conditions in real-time. Furthermore, anyone can register and save _towns_ in _collections_ so checking the weather in multiple _towns_ at the same time becomes easier.

## 👩🏼‍💻 App Features

### 1. Browse Weather

For non-registered users the app lets them browse the weather for different _towns_ by using the combo box present in the browse view.

> Initially the combo box shows only 20 out of the 8000+ _towns_ available and uses the user input to filter from the whole group of towns.

With each selected town a card gets displayed showing information about the weather conditions at that point of time at the selected town.

The information displayed contains the name of the town, the current temperature and rain probability at first glance. Above the town name, the app shows an icon that is _intended_ to show the sky status regardless of the temperature and the rain chance. Not every sky status from the service provider is mapped so it is not as accurate as it could be, but it serves its purpose.

The card also shows less relevant information such as the maximum and minimum temperatures for the day (beneath the current temperature) and the maximum probability of rain that will occur during the day.

Beneath all these details a chart is displayed with the temperature trends for the following 5 days. To keep it simple no actual values are shown, but with the current temperature and the trend, the user can get an idea about how the following days will come up.

As the weather can sometimes change pretty quickly I have added a reload button to the card which loads more updated information about that particular town.

### 2. User authentication

To get access to more functionalities a user must be signed in. While the full app is loaded into the browser (no code splitting to keep it simple), some views are restricted to authenticated users, so navigating to them redirects to the sign-in view.

> The navigation to these views if not authenticated can only be done using the URL as the navigation bar hides the links for non-authenticated users.

If not authenticated the user can use the login link to access the sign-in view, which displays a form that allows them to log in to the application.

I have added a **keep me logged in** feature that allows users to close the tab or even the browser and restore the session the next time they navigate into the application (considering the user token has not expired).

From this view, the user can navigate back and forth to the register view which is quite similar to this one but allows them to register their account into the system.

> There are no restrictions for the username, email, and password as not much validation is done on neither sides (front/back) to keep it simple. Nevertheless, validation is something important and should be considered as a to-do feature.

Both the sign-in and sign-up actions redirect the users back to the browse view where their current search is kept so they can immediately start saving _towns_ to their collections.

User information (name and email) appears now on the top of the screen beside the new link to the _collections_ view. From the user menu that becomes visible upon clicking on the user avatar, they can log out from the application.

This log-out process clears the session so even if they used the **keep me logged in** feature, next time they browse into the application they would have to sign in again. This is the intended behavior.

### 3. Collections

A signed-in user can save _towns_ to either an existing _collection_ or create a new _collection_ containing the selected town.

If the user has no _collections_ only the _Save to new collection_ option is available. The user can then set the name for the new _collection_ and click the save button which will create said _collection_ and make it available at the _collections_ view.

If the user already has any _collection_ a second option will appear allowing the user to select the _collection_ to which he/she can then save the town.

All these _collections_ will show the _collections_ view, where the user can manage them. The user is there able to delete existing _collections_ and organize them into a different order using **drag & drop**. The new order is persisted so the next time the user comes online the _collections_ will be ordered as he/she last ordered them.

The user can also check the saved _towns_ for any _collection_ by clicking the _Go to places_ link within the _collection_ card. Note that this link will be disabled if no _towns_ are stored within the collection.

## 🛠 Technical features

### 1. APIs

This web application uses two different REST APIs to get and persist the data.

For the `towns` and `weather` information uses the [el-tiempo.net](el-tiempo.net) weather API. This API provides a lot of information about the weather conditions for a given town, so I have mapped the response to a more concise model which holds just the values I need and does some transformations on them. The data used from this API is:

- `town`:

```js
{
  label: town.NOMBRE,
  name: town.NOMBRE,
  county: town.NOMBRE_PROVINCIA,
  code: town.CODIGOINE?.slice(0, 5),
  countycode: town.CODPROV
}
```

- `weather`:

```js
{
  name: weather.municipio?.NOMBRE,
  date: weather.fecha,
  sky: weather.stateSky?.description,
  rainChance: {
    value: +weather.pronostico?.hoy.prob_precipitacion?.[0],
    units: "%"
  },
  rainPredictions: {
    values: weather.pronostico?.hoy.prob_precipitacion.map((v) => +v) || [],
    units: "%"
  },
  predictions:
    weather.proximos_dias?.map((prediction) => ({
      date: prediction?.["@attributes"]?.fecha,
      max: +prediction?.temperatura?.maxima,
      min: +prediction?.temperatura?.minima
    })) || [],
  temperature: {
    current: { value: +weather?.temperatura_actual, units: "ºC" },
    max: { value: +weather?.temperaturas?.max, units: "ºC" },
    min: { value: +weather?.temperaturas?.min, units: "ºC" }
  }
}
```

I have found that the rain chance is better read from the first element of the prognostic array for the current day than from the `lluvia` key as this seems to be indicating the _l/m3_.

For the persistence of the `collections` and `places` I have used an API that I previously developed and used for other purposes but which already has good user authentication features and is easy to scale for new services such as the ones implemented for this specific case.

It is node REST API using express connected to a MongoDB Atlas DB cluster and deployed in Heroku.

> The source code for this REST API can be found [here](https://github.com/pedro-rodalia/penguin-api). The code is not documented at the moment and the code for this specific use case is yet to be revised and refactored. Documentation about the API can be found [here](https://documenter.getpostman.com/view/5426130/TzRVe68g#9fe2fde5-7bb0-425e-add0-621b8e648186)

This API mainly works with three models (User, Collection and Place). As I had full control over the API the models don't need any mapping and are suited for this application. The only model with fields unused within the app is the Users model as it was developed some time ago and was intended to be flexible enough for any use case.

> As mentioned before this is a personal API and it is not battle-tested, and although passwords are encrypted it's safer not to use real email addresses as the system allows the use of non-existing accounts. Also using a valid email can lead to receiving a confirmation email which of course can be ignored (not sure if this feature still works though).

- `users`:

```js
{
 admin: false,
 validated: false,
 _id: "609647c73b874e84dd1e4964",
 username: "genericuser",
 email: "genericemail@gmail.com",
 createdAt: "2021-05-08T08:11:51.357Z",
 updatedAt: "2021-05-08T08:11:51.357Z",
 url: "https://penguin-platform.herokuapp.com/api/application/users/609647c73b874e84dd1e4964"
},
```

- `collections`:

```js
{
  order: 0,
  _id: "609d1f90168a4049938786e6",
  name: "Madrid",
  icon: "visMapCoordinate",
  userId: "609647c73b874e84dd1e4964",
  createdAt: "2021-05-13T12:46:08.712Z",
  updatedAt: "2021-05-13T12:46:08.712Z",
  url: "https://penguin-platform.herokuapp.com/api/weather/collections/609d1f90168a4049938786e6",
  placesUrl: "https://penguin-platform.herokuapp.com/api/weather/places/collection=609d1f90168a4049938786e6"
}
```

- `places`:

```js
{
  _id: "6099482f7aa45c642d343647",
  name: "Madrid",
  code: "28079",
  county: "Madrid",
  countyCode: "28",
  collectionId: "6099482f7aa45c642d343646",
  createdAt: "2021-05-10T14:50:23.078Z",
  updatedAt: "2021-05-10T14:50:23.078Z",
  url: "https://penguin-platform.herokuapp.com/api/weather/places/6099482f7aa45c642d343647"
}
```

This API provides user authentication via JWT which is used both for restricting access and determining which data to return. A query for the _collections_ by a given user will only return results associated to that user, so there is no way of getting _collections_ from other users.

When fetching the list of _collections_, the **Mongo DB aggregation** framework is used to merge the Collections collection with the Places collection so the _collections_ already have the list of _places_ they contain.

This is not good for scaling up the system as the _places_ list and the _collection_ list grows because it can lead to performance issues, but, for the sake of simplicity, it's a good solution.

### 2. Persistence system

The persistence of most of the data is done serverside using the provided REST API.

The only data stored within the browser is the user information if he/she decides to use the **keep logged in** feature. This information is encrypted using **jwt** before being saved but as this is done within the browser is not meant to protect the data. It just makes it unreadable and harder to decode. Nevertheless, no sensitive data is stored here, just the username and email.

This is also used to invalidate the session if a certain amount of time has elapsed since the sign-in. When decrypting the user data the token is verified and if it has expired the user is redirected to the sign-in view.

### 3. User Interface

The user interface is mainly built using Elastic UI set of components, which work great.

For theeming, I decided to go with css variables as I find them to be very performant and don't require too much work to set up. While it's true that in this case, themes don't act much on the interface, it was a feature I wanted to add without spending too much time on it, also because theming the Elastic UI interface is not easy and it's usually better to stick to the themes provided by them. For this reason, some components might not match the theme.

For the background, I used SVG images styled using the theme provided variables and a simple CSS animation.

> The user interface here is simple and effective but has a lot of room for improvement such as making sure the user knows about what error ocurred and why. Still some work to be done here 👨🏽‍🏭

### 4. Frameworks used

Every framework named within the requirements for this application has been used alongside some other frameworks of my own choice.

_React-Redux_ is the framework of choice for the store management, together with _Redux-Saga_ for the asynchronous actions and _Reselect_ for the memoization of heavily loaded selectors such as the `filteredTowns` selector which feeds into the IomTownPicker component.

I have also used _React-Router_ for the routing aspects of the application and _Axios_ for handling fetch requests.

Although installed I haven't used _Prop-Types_, I would rather learn how to properly use _typescript_ alongside React which in my opinion is a far better solution for type-checking.

### 4. Testing

Coverage for this web app is not too good (around 20% coverage). Testing is key to good software, but time limitations and technical difficulties have resulted in poor coverage.

Nevertheless, I tried to test as many different cases as possible to showcase my knowledge about testing which in my opinion is quite extensive.

> I have written a guide about testing in Vue for my current coworkers that can be found [here](https://github.com/pedro-rodalia/test-course/blob/master/readme.md)

The test runner I chose is _Jest_ because I'm used to writing tests using it and works well with _React_. Testing pure javascript aspects of the application such as helper functions and redux-related code was easy, however, testing React components turned out to be a hassle. From my experience testing _Vue.js_ components neither Enzyme nor React Testing Library makes it easy enough to test components. Enzyme is very similar to the vue-test-utils library I currently use, and although the same principles apply (not testing implementation but the API of each code unit) I couldn't make it work properly enough with _React_. However, with some more time and dedication, It wouldn't be long before testing _React_ components come as naturally to me as testing _Vue.js_ components does.

Some interesting testing techniques like testing timers, API services, errors, etc... are showcased in the tests included with the code, and I consider the ability to integrate the testing aspects of the application into the workflow using CI/CD and reporting is a differential aspect about my knowledge.

### 5. CI/CD

As a frontend engineer with a heavy computer science background, I'm quite into CI/CD tools and automation of tasks so I decided to focus on these aspects as well.

This web uses Github Actions for the CI/CD operations which are in charge of building the application and running the test suite. It is also used to report the coverage results to [Codecov](https://app.codecov.io/gh/pedro-rodalia/head-in-the-clouds) and upload the bundle to [Netlify](https://head-in-the-clouds.netlify.app/) where is made public. The pipeline definition can be found [here](./.github/workflows/main.yml) and is meant to run only on the _main_ branch.

## Task list:

- Functional requirements:

  - [x] Implement a functionallity that allows the user to select a city from a collection of cities. The user should be able to search asynchronously throughout the collection of cities. (https://elastic.github.io/eui/#/forms/combo-box)
  - [x] Show information regarding the selected cities weather within a Card (https://elastic.github.io/eui/#/display/card). The card should display the `name`, the `temperature` and the `chance of precipitation`. This data can be obtained from the [el-tiempo.net](el-tiempo.net) API. The card should also display a button that allows its removal from the set of cards.
  - [x] The user should be able to save a search result (multiple cities if needed) so that when the user comes back online he/she will be able to go through these saved results.
  - [x] The app must allow the user to register and login in order to save _collections_ of results.
  - [x] The user must be able to sort and delete saved search results.

- Technical requirements:

  - [x] Build a React SPA (using, for instance, ​https://create-react-app.dev/​)
  - [x] Install the Elastic UI framework (​https://github.com/elastic/eui/blob/master/wiki/consuming.md​)
  - [x] Use ​redux​ as a state manager.
  - [x] Use redux-saga to manage the persistence module.
  - [x] Upload the app source code to Github.
  - [x] Make the website available through Netlify.
  - [x] Test the application functionallity.
  - [x] (Optional) Use ​reduxjs-reselect​ to enhance the state management.
  - [x] (Optional) Use react-router to manage routing.

[showcase]: .github/showcase.png
