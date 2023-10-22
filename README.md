# GymBuddy (Back-End)

This repository is the GymBuddy Back-End for the GymBuddy App. It is designed to be used with the GymBuddy Front-End. It utilises MongoDB with Mongoose, Google OAuth with Passport, has full Swagger documentation, and provided API access for authentication, user data, and gym data.

## Installation

Pull or Download the Repository to local machine

Create your local .env file and add the following keys to your .env file

```yaml
GYM_BUDDY_DB_USER="MONGO_DB_USER"
GYM_BUDDY_DB_PASSWORD="MONGO_DB_PASSWORD"
GYM_BUDDY_DB_URL="MONGO_DB_URL"
GYM_BUDDY_DB_NAME="MONGO_DB_DATABASE_NAME"
GYM_BUDDY_CLIENT_ID=GOOGLE_OAUTH_APP_CLIENT_ID
GYM_BUDDY_CLIENT_SECRET=GOOGLE_OAUTH_APP_CLIENT_SECRET
GYM_BUDDY_SECRET_KEY=GYM_BUDDY_OAUTH_SESSION_SECRET_KEY
```

Run commands

```bash
npm install
npm start
```

## App Architecture

GymBuddy uses Express to route requests to the appropriate location in the App. The App utilises standard MVC architecture principles, being split into three core components; Routers, Controllers, and Models, responsible for routing requests, handling request and response logic, and handling data storage and mutation respectively. The Database is hosted on a MongoDB instance. The App also has connectivity to Google OAuth using Passport, and is designed to be used with the GymBuddy Front-End to make requests.

## API Overview

```bash
/gyms
```

The /gyms endpoint handles most of the application features. Requests can be made to access and change the data for Gyms, Equipment, and Reviews. Reviews and Equipment are all associated with a specific gym, so these are wrapped within the root /gym endpoint.

```bash
/auth
```

The /auth endpoint handles requests related to authentication. Requests can be made to initiate the OAuth flow, and to check the authenticated status of a supplied Session ID.

```bash
/users
```

The /users endpoint handles requests related to user data. Users are stored in the Database with a Google ID and an internal userId; this userId can be retrieved based on a Session ID, and in the Front-End for example, to compare against the owner userId for a particular resource.

## Tests

```bash
npm test
```

Integration Tests are written using the Jest library. Supertest is used to make requests to an endpoint, and receive the response. The OAuth response is mocked out using Jest, with a dummy clientId and clientSecret, to avoid the dependency on Google for the tests. The Database uses an in-memory instance of MongoDB, which is created fresh on each run, ensuring that tests are kept isolated from each other, and to avoid data contamination from test data.

## CI Pipeline

The CI Pipeline is configured with GitHub Actions. Upon each merge request, the GitHub Workflow will run the tests for the App, rejecting the merge request if the tests fail.

## Database

[MongoDB Dashboard](https://cloud.mongodb.com/v2/)

The Database is hosted on a MongoDB instance. The App requires the following environment variables

```yaml
GYM_BUDDY_DB_USER
GYM_BUDDY_DB_PASSWORD
GYM_BUDDY_DB_URL
GYM_BUDDY_DB_NAME
```

Interfacing between the App and MongoDB is done via the Mongoose library, with Mongoose enforced schema structures.

## Swagger

[Swagger API](http://localhost:8001/api-docs/)

The Swagger API Documentation can be found at the above URL (for local instances). The API documentation will list each available API, along with expected request and response format, and allow users test these API endpoints.

## Authentication

[Google Developer Dashboard](https://console.cloud.google.com/apis/dashboard)

Authentication is provided via Google OAuth, using the Passport library. Requests are made to the /auth endpoint, which redirects to the Google OAuth server. The OAuth flow will end with a request to the /auth/google/callback endpoint, which returns a Session to store in the browser; this same session will be checked on authenticated endpoints via Express Middleware, which will verify that the user is authenticated before proceeding with the request.

## Docker

[Docker Dashboard](https://hub.docker.com/repositories/brookegodbold)

The App is set up for Docker. Containers can be created and run using standard Docker commands, and can be pulled from the 'brookegodbold' repository against the 'gym-buddy' tag.

To build an Image of the Container:

```bash
docker build . -t brookegodbold/gym-buddy
```

To run a local instance of the Image:

```bash
docker run -it -p 8001:8001 brookegodbold/gym-buddy
```

To push the Image to the Docker Repository:

```bash
docker push brookegodbold/gym-buddy
```

## AWS

[AWS Console](https://eu-west-2.console.aws.amazon.com/console/)

The App is able to be run on an instance of AWS, but further steps need to be done to enable full connectivity between the Front-End and Back-End

- The Express App instance configured to serve over HTTPS, including getting a certificate issued for this purpose
- The Express App instance to include the Front-End hostname within the App CORS Whitelist
- The App Swagger Config to include the AWS host within its server list
- The hosted instance of the Front-End to have the VITE_GYM_BUDDY_API_URL environment variable set to the AWS hostname & port (8001 by default)
- The Google Developer Console to include the Front-End hostname within the Authorized Origins, and the AWS hostname and Callback API path within the Authorized Redirects
