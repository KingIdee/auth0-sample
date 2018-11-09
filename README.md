# Building and Securing Node.js APIs

1. Create an [Auth0](https://manage.auth0.com/#/applications/create) application. Choose single page application when asked for the type of application. Enter the application details accordingly.
2. Replace the values of `auth0Domain` and `clientId` in the `env-variables.json` file with the values from your newly created Auth0 application.
3. Do similar thing for the `clientID` and `domain` variable embedded in the `auth` variable found in the `frontend/public/js/auth.js` file.
4. Create a [new API](https://manage.auth0.com/#/apis) on Auth0.
5. Enter a friendly name for your API. For the identifier, use - `https://backend-api-url.com/`

> You can use any `URL` for the identifier, but since this is what you will find in this project, you can choose to maintain it.

6. If you chose not to maintain our identifier, replace the value of `apiIdentifier` in the `env-variables.json` with your own identifier.
7. Do similar thing for the `audience` variable embedded in the `auth` variable found in the `frontend/public/js/auth.js` file.
8. Move into the `backend` folder directory.
9. Install npm modules using - `npm install i`
10. Run your app on - `http://localhost:5000/`

