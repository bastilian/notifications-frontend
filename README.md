[![Build Status](https://travis-ci.org/RedHatInsights/insights-frontend-starter-app.svg?branch=master)](https://travis-ci.org/RedHatInsights/insights-frontend-starter-app)

# Notifications Frontend

Notifications Frontend for Red Hat Insights based on [https://github.com/RedHatInsights/insights-frontend-starter-app](insights-frontend-starter-app)*

_* See for intro do basic workings of Insights frontend code_

## Getting Started

This app can either be run as described on the "Getting Started" section of the [Insights Starter App](https://github.com/RedHatInsights/notifications-frontend#getting-started).

There is also a docker-compose file to start the insights-proxy with a local insights-chrome and the frontend in containers. If you have Docker and Docker Compose set up the following steps are required for them to be run:

 1. Clone and and [build insights-chrome](https://github.com/RedHatInsights/insights-chrome#running-the-build)*
 2. Copy `.env.example` to `.env`
 3. Change the `LOCAL_CHROME_PATH` environment path to point to the locally built insights-chrome
 4. [Update your hosts file](https://github.com/RedHatInsights/insights-proxy#setup-the-initial-etchosts-entries-do-this-once) to have required development host names correctly resolved
 5. Run `docker-compose up` in the notifications-frontend directory
 6. If all built correctly the frontend should be available at https://ci.foo.redhat.com:1337/insights/webhooks/

## Code preferences

  * Use same form of defining components
  	* Use function style components for PresentationalComponents
  	* Class-style for SmartComponents
  	* Prefer proptype definitions defined as static property in class-style components
  * Have Only one component per file
  * Avoid relative paths for Components
  * Use implicit return when possible
  * Have one reducer per file and resource-type
  * Avoid long definitions in props
  	* Pass a function or the return of it instead
  	* Use a const for strings, JSX or long object-paths
  * Avoid semi-colons
  	* Unless eslint asks for one


### Testing

- Travis is used to test the build for this code.
  - `npm run test` will run linters and tests

## Deploying

- The Platform team is using Travis to deploy the application
  - The Platform team will help you set up the Travis instance if this is the route you are wanting to take

### How it works

- any push to the `{REPO}` `master` branch will deploy to a `{REPO}-build` `ci-beta` branch
- any push to the `{REPO}` `ci-stable` branch will deploy to a `{REPO}-build` `ci-stable` branch
- any push to the `{REPO}` `qa-beta` branch will deploy to a `{REPO}-build` `qa-beta` branch
- any push to the `{REPO}` `qa-stable` branch will deploy to a `{REPO}-build` `qa-stable` branch
- any push to the `{REPO}` `prod-beta` branch will deploy to a `{REPO}-build` `prod-beta` branch
- any push to the `{REPO}` `prod-stable` branch will deploy to a `{REPO}-build` `prod-stable` branch
- Pull requests (based on master) will not be pushed to `{REPO}-build` `master` branch
  - If the PR is accepted and merged, master will be rebuilt and will deploy to `{REPO}-build` `ci-beta` branch

## Patternfly

- This project imports Patternfly components:
  - [Patternfly React](https://github.com/patternfly/patternfly-react)

## Insights Components

Insights Platform will deliver components and static assets through [npm](https://www.npmjs.com/package/@red-hat-insights/insights-frontend-components). ESI tags are used to import the [chroming](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer.

## Technologies

### Webpack

#### Webpack.config.js

This file exports an object with the configuration for webpack and webpack dev server.

```Javascript
{
    mode: https://webpack.js.org/concepts/mode/,
    devtool: https://webpack.js.org/configuration/devtool/,

    // different bundle options.
    // allows you to completely separate vendor code from app code and much more.
    // https://webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
        chunks: https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks-chunks-all,
        runtimeChunk: https://webpack.js.org/plugins/split-chunks-plugin/#optimization-runtimechunk,

        // https://webpack.js.org/plugins/split-chunks-plugin/#configuring-cache-groups
        cacheGroups: {

            // bundles all vendor code needed to run the entry file
            common_initial: {
                test: // file regex: /[\\/]node_modules[\\/]/,
                name: // filename: 'common.initial',
                chunks: // chunk type initial, async, all
            }
        }
    },

    // each property of entry maps to the name of an entry file
    // https://webpack.js.org/concepts/entry-points/
    entry: {

        // example bunde names
        bundle1: 'src/entry1.js',
        bundle2: 'src/entry2.js'
    },

    // bundle output options.
    output: {
            filename: https://webpack.js.org/configuration/output/#output-filename,
            path: https://webpack.js.org/configuration/output/#output-path,
            publicPath: https://webpack.js.org/configuration/output/#output-publicpath,
            chunkFilename: https://webpack.js.org/configuration/output/#output-chunkfilename
    },
     module: {
         rules: https://webpack.js.org/configuration/module/#module-rules
     },

     // An array of webpack plugins look at webpack.plugins.js
     // https://webpack.js.org/plugins/
     plugins: [],

     // webpack dev serve options
     // https://github.com/webpack/webpack-dev-server
     devServer: {}
}
```

### React

- High-Order Component

  - a [higher-order component](https://reactjs.org/docs/higher-order-components.html) is a function that takes a component and returns a new component
    - Ex) [asyncComponent.js](https://github.com/RedHatInsights/insights-frontend-starter-app/src/Utils/asyncComponent.js)

- [Smart/Presentational Components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)
  - Smart components have access to the redux state
  - Presentational components do not have access to the redux state
  - Smart Components === insights-frontend/app/js/states
  - Presentational Components === insights-frontend/app/js/components

- [State and lifecycle within class components](https://reactjs.org/docs/state-and-lifecycle.html)
  - article contains:
    - Adding Lifecycle Methods to a Class
    - Adding Local State to a Class
    - State Updates May Be Asynchronous
    - State Updates are Merged

### Redux

#### Store

A [store](https://redux.js.org/basics/store) holds the whole [state tree](https://redux.js.org/glossary) of your application.
Redux doesn't have a Dispatcher or support many stores. Instead, there is just a single store with a single root reducing function.

[Create Store](https://redux.js.org/api-reference/createstore): ```createStore(reducer, preloadedState, enhancer)```

- methods
  - [getState()](https://redux.js.org/api-reference/store#dispatch)
  - [dispatch(action)](https://redux.js.org/api-reference/store#dispatch)
  - [subscribe(listener)](https://redux.js.org/api-reference/store#subscribe)
  - [replaceReducer(nextReducer)](https://redux.js.org/api-reference/store#replaceReducer)

#### Actions

[Actions](https://redux.js.org/basics/actions) are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using [store.dispatch()](https://redux.js.org/api-reference/store#dispatch).
Redux actions should only have two properties, type and payload, as a best practice.

- Async Actions frameworks

  - [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)
    - Currently using this
      - look at [/src/api/System/getSystems.js](https://github.com/RedHatInsights/turbo-octo-couscous/tree/master/src/api/System/getSystems.js)
  - [redux-thunk](https://github.com/gaearon/redux-thunk)
    - A function that wraps an expression to delay its evaluation
    ```Javascript
    // gotSystems(Error) are action creators
    function getSystems() {
          return function (dispatch) {
            return fetchSystems().then(
              systems => dispatch(gotSystems(systems)),
              error => dispatch(gotSystemsError(error))
            );
          };
        }
    ```
  - [redux-saga](https://github.com/yelouafi/redux-saga/)
    - Uses [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
    - Could be a lot to learn initially.
  - [redux-pack](https://github.com/lelandrichardson/redux-pack)

#### Reducers

[Reducers](https://redux.js.org/basics/reducers) specify how the application's state changes in response to actions sent to the store.

Ex) [/src/api/System/getSystems.js](https://github.com/RedHatInsights/turbo-octo-couscous/tree/master/src/api/System/getSystems.js)

### React-redux

- [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)
  - Makes the Redux store available to the connect()
- [connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
  - Connects a React component to a Redux store

### React-router-dom

When setting up the routes, the page content is wrapped with a `.page__{pageName}` class, applied to the `#root` ID that is determined by the `rootClass` in the `Routes.js` which lets you easily reference the page in the styling.

- [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter)
  - A `<Router>` that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL
- [Route](https://reacttraining.com/react-router/web/api/Route)
- [Switch](https://reacttraining.com/react-router/web/api/Switch)
  - Renders the first child `<Route>` or `<Redirect>` that matches the location.
- [Redirect](https://reacttraining.com/react-router/web/api/Redirect)
  - navigate to a new location
- [withRouter](https://reacttraining.com/react-router/web/api/withRouter)
  - passes updated match, location, and history props to the wrapped component whenever it renders
