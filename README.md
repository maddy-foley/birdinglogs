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
    <li><a href="#acknowledgements">Acknowledgements</a></li>
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
<p align="right"><a href="#readme-top">:whale: back to top</a></p>

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
<p align="right"><a href="#readme-top">:whale2: back to top</a></p>

### Trouble Shooting
<i>Node modules not found</i>
- Ensure the latest version of node.js is on your local computer

<i>Bird data is missing or api crashed</i>
- try restarting the containers using:  ```docker compose stop``` followed by ```docker compose up```
<p align="right"><a href="#readme-top">:whale: back to top</a></p>

## Usage

An educational app to help bird lovers track birds and encourage interaction and acknowledgment of the local nature around them.

This application also shows my software development skills.
<p align="right"><a href="#readme-top">:bird: back to top</a></p>

<!-- ROADMAP -->
## Roadmap

- [x] Interactive Bird Catalogue
- [x] User Authentication
- [x] Note Taking Feature
- [ ] Bird Feeder Tracking
- [ ] Update Authentication
- [ ] TBD
<p align="right"><a href="#readme-top">:car: back to top</a></p>

## Contact

This application was developed independently and I appreciate any feedback. You can find me on linkedin:
https://www.linkedin.com/in/maddy-foley/
<p align="right"><a href="#readme-top">:baby_chick: back to top</a></p>

## Acknowledgements
- All current data is pulled from wikipedia and wikipediaapi
- More resources to come with changes!

<p align="right"><a href="#readme-top">:hatched_chick: back to top</a></p>
