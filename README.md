<a id="readme-top"></a>
<br />
<div align="center">
    <img src="./assets/images/junco.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Birding Logs</h2>

  <p align="center">
    A full stack web application created for bird enthusiasts!
</div>

<details>
  <summary>Table of Contents :owl: </summary>
  <ol>
    <li>
      <a href="#about-birding-logs">About Birding Logs</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#trouble-shooting">Trouble Shooting</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About Birding Logs

<img src="./assets/images/homescreen.png">
<p align="right"><a href="#readme-top">:dove: back to top</a></p>

### Built with
[![React][React.js]][React-url]


## Getting Started

### Prerequisites
You will need:
- latest version of node.js
- docker on your local machine
- a clone of this repository
- some command line knowledge

### Setup
 1. Please clone this repository onto your local machine

 2. create a ```.env``` file in **/birdinglogs** directory. In this file you will need to declare **4 variables**:
    ```
    SIGNING_KEY=<letters or numbers (length 20-40)>
    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=<postgres database>
    ```

    Example:
    ```
    SIGNING_KEY=XT71ZDOLST1B9N3GZ0PD6YJT0
    POSTGRES_USER=test_user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=test_database
    ```

 3. On your command line go back to the **/birdinglogs** repo directory and use these commands:
    -   ```docker volume create bird-data```
    -   ```docker compose build```
    -   ```docker compose up```
    -   Go to your http://localhost:3000/ to see the website! I would recommend viewing the application on Google Chrome.
    - If there is no bird content
    -   When you are done, run ```docker compose down``` to remove all the containers.
    -   ```docker volume remove bird-data``` will remove the volume.
 4. Enjoy!

### Trouble Shooting
<i>Node modules not found</i>
- You must ensure the latest version of node.js is on your local computer

<i>Bird data is missing or api crashed</i>
- try restarting the containers using:  ```docker compose stop``` followed by ```docker compose up```
