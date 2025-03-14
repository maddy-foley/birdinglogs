## Welcome to Birding Logs!

The application uses FastAPI, React.JS, PostgreSQL and Docker

## If you would like to run this website on your local machine, please:

 1. Please clone this repository onto your local machine

 2. create a ```.env``` file in **/birdinglogs**. In this file you will need to declare **5 variables**:
    ```
    SIGNING_KEY=<letters or numbers (length 20-40)>
    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=<postgres database>
    ```
 3. Go to your command line and the **/birdinglogs/ghi/app** directory and install node_modules by running the command:
    - ```npm install```
 4. On your command line go back to the **/birdinglogs** repo directory and use these commands:
    -   run ```docker volume create bird-data```
    -   run ```docker compose build```
    -   run ```docker compose up```
    -   Go to your http://localhost:3000/ to see the website! I would recommend viewing the application on Google Chrome.
    -   When you are done, run ```docker compose down``` to remove all the containers.
    -   ```docker volume remove bird-data``` will remove the volume.
 5. Enjoy!


This was developed independently and I appreciate any feedback. You can find me on linkedin:
https://www.linkedin.com/in/mad-foley/
