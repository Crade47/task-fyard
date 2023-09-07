## Overview

This is a repository for the task assigned from the company Frontyard. This project was bootstrapped from create-react-app. It uses Typescript to ensure type safety, tremor to display graphs, react-leaflet for displaying map-leaflets, React query for data fetching and caching, Redux toolkit for global state management and Planetscale for a MySQL database.


## Prerequisites

Before you can fully utilize the CRUD operations on the "Contacts" page, you need to set up the Vercel CLI and run the development server using the `vercel dev` command. 
There are many unfixed errors for the local development of serverless api routes for non next.js contexts like this project. I will recommend checking the crud operations through the deployed link. However if you still want to check the apis you can do the following:

1. Install the Vercel CLI globally if you haven't already:

   ```bash
   npm install -g vercel
   ```
2. Authenticate with your Vercel account:

  ```bash
  vercel login
  ```
3. Link local project to project created in the vercel dashboard:

  ```bash
  vercel link
  ```
4. To run the api locally:

  ```bash
  vercel dev
  ```
Another note: The delete operation would not work locally due to some unpatched errors on vercel's side (it works fine after being deployed).

Once deployed, the "Contacts" page's CRUD operations should work as expected on localhost:3000.

## Running the app locally:
Please Note that only the Maps and Charts page will be correctly displayed:
1. Install the node modules:
  ```bash
  npm install
  ```
2. Run
  ```bash
  npm start
  ```
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload if you make edits, but please note that the "Contacts" page's CRUD operations won't work locally without setting up Vercel Serverless Functions.

3. Build
 ```bash
 npm run build
```
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance. Your app will be ready for deployment.
