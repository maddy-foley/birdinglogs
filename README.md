## Welcome to Birding Logs!

The application uses FastAPI, React.JS and PostrgreSQL

If you would like to run this website on your local machine, please:
 1. create a ```.env``` file. In this file you will need to declare **5 variables**:
    ```
    SIGNING_KEY=<letters or numbers (length 20-40)>
    DATABASE_URL=<postgresql://<username>:<password>@db/<database>
    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=<postgres database>
    ```
 2. go to your commandline and cd to **/birdinglogs** repo directory:
    -   run ```docker volume create bird-data```
    -   run ```docker compose build```
    -   run ``` docker compose up``` *if api image fails to run try going to docker dashboard and try again*
    -   Go to your http://localhost:3000/ to see the website! I would recommend viewing the application on Chrome.

 3. Bird Data is currently hidden, you can still test things by creating an account and adding your own bird.


This was developed independent and I appreciate any feedback. You can find me on linkedin:
https://www.linkedin.com/in/mad-foley/
