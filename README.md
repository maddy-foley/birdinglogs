## Welcome to Birding Logs!

UPDATE: May 4th, 20203

- Data is viewable and can be easily spinned up on computer!

The application uses FastAPI, React.JS, PostrgreSQL and Docker

## If you would like to run this website on your local machine, please:

 1. Please clone this repository onto your local machine

 2. create a ```.env``` file in **/birdinglogs**. In this file you will need to declare **5 variables** by replacing anything in the <>:
    ```
    SIGNING_KEY=<letters or numbers (length 20-40)>
    DATABASE_URL=postgresql://<username>:<password>@db/<database>
    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=<postgres database>
    ```
 3. Go to your commandline and cd to **/birdinglogs** repo directory. I am working on the docker compose to be one command but it currently needs a few extra steps :)  :
    -   run ```docker volume create bird-data```
    -   run ```docker compose build```
    -   run ```docker compose up``` *please individually start api container on docker dashboard if it crashes!*
    - in docker dashboard open the built-in api terminal and then run ```python bird-data.py```. You should see print statements confirming the data has loaded into the volume.
    -   Go to your http://localhost:3000/ to see the website! I would recommend viewing the application on Chrome.
    -   When you are done, run ```docker compose down``` to remove all the containers. Add ```--volumes``` at the end if you'd like to delete the volume.

 3. Enjoy!


This was developed independent and I appreciate any feedback. You can find me on linkedin:
https://www.linkedin.com/in/mad-foley/
