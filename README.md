This is the Drixit Challenge Solution. It consists of a front-end React Application with a login and user information page, together with a NodeJS API to authenticate and obtain the data.

Structure:
    
    /client: Contains the React Client Application. The app uses React-Router for the routing between the different pages.
        /src/login-component: Contains the React component for the login page.
        /src/user-info-component: Contains the React component for the user information page.
    /server: Contains the NodeJS Application. The library ExpressJS was used to create the API for the client.
        /routes: Contains the different API routes.
        /controllers: Contains the application controllers which will process the request and send the appropriate response.
        /data: Contains the stored users data in a JSON file.

Instructions:

    1. Enter the /client folder and run 'npm install'.
    2. Enter the /server folder and run 'npm install'.
    3. Inside the /server folder run 'npm start' to start the NodeJS application server (on port 8080).
    4. Inside the /client folder run 'npm start' to serve the React Application locally (on port 3000).
    5. The application can now be used in the browser at:
        Local:            http://localhost:3000
        On Your Network:  http://192.168.0.131:3000

Details:

    .Data between the front and back end is transferred as JSON.
    .Authentication is done via JWT tokens via the 'Authorization' header using the 'Bearer' scheme.
    .The user token is stored in the browser to keep them logged in.
    .The website automatically redirects to the login page if not logged in, otherwise redirects to the user information page.
    .If the user information page is visited unauthenticated, the user is redirected to the login page.
    

