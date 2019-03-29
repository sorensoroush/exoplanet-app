# Exoplanet App

## What is it?

The Exoplanet Planetarium is a React app that fetches data from NASA's exoplanet archive and dynamically displays the data of various exoplanets. The data is displayed on HTML canvases, and it includes: planet orbit radius and eccentricity, planet mass and radius (relative to Jupiter), distance of the system to ours, and host star brightness, temperature, mass, and radius (relative to the Sun).

## Wireframes

[Wireframe](https://imgur.com/Lu7Cjnl)

I had a general idea of how I wanted to lay out the information, but I changed the lower-right section to something that displayed information more meaningful than just the distance to our system. I ended up adding host star information as well because the archive contains a good amount of information about them.

### MVP EXAMPLE

- Find and use external api
- Render data on page
- Randomize planet and therefore randomize rendered data
- Navigate to different endpoints

### PostMVP EXAMPLE

- Add links on a page to go to a specific planet
- Ability to search for a specific planet
- Include orbits of planets other than Earth
- Include size of Earth as well as Jupiter (depending on exoplanet size)

## React Component Hierarchy

App > Header
App > NavBar
App > Home
App > RandomPlanet
App > RandomPlanet > OrbitStats
App > RandomPlanet > PlanetStats
App > RandomPlanet > StarStats
App > About
Loading

### State Components

| Component | Description | 
| --- | :---: | 
| App | Renders the entire page |
| RandomPlanet | Renders the stats container grid, along with the planet name and the random button |
| OrbitStats | Renders and draws the orbits canvas and information |
| PlanetStats | Renders and draws the planets canvas |
| StarsStats | Renders and draws the orbits canvas |

### Functional Components

| Component | Description | 
| --- | :---: | 
| Header | Renders the header |
| NavBar | Renders the nav and its links |
| Home | Renders the app description |
| About | Renders the api description |
| Loading | Renders a loading message |

