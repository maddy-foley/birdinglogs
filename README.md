## Welcome to Birding Logs!


The application uses FastAPI, React.JS, PostrgreSQL and Docker

## If you would like to run this website on your local machine, please:

 1. Please clone this repository onto your local machine

 2. create a ```.env``` file in **/birdinglogs**. In this file you will need to declare **5 variables**:
    ```
    SIGNING_KEY=<letters or numbers (length 20-40)>
    DATABASE_URL=postgresql://<username>:<password>@db/<database>
    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=<postgres database>
    ```
 3. Go to your commandline and the **/birdinglogs/ghi/app** directory and install node_modules by running the command:
    - ```npm install```
 4. On your commandline go back to the **/birdinglogs** repo directory. I am working on the docker compose to be one command but it currently needs a few extra steps :)  :
    -   run ```docker volume create bird-data```
    -   run ```docker compose build```
    -   run ```docker compose up``` *please individually start api container on docker dashboard if it crashes!*
    - in docker dashboard open the built-in api terminal and then run ```python bird-data.py```. You should see print statements confirming the data has loaded into the volume.
    -   Go to your http://localhost:3000/ to see the website! I would recommend viewing the application on Chrome.
    -   When you are done, run ```docker compose down``` to remove all the containers.

 5. Enjoy!


This was developed independent and I appreciate any feedback. You can find me on linkedin:
https://www.linkedin.com/in/mad-foley/
