# CampGuide

An interactive web application that facilitates the registration and discovery of campgrounds.
The application enables users to leave reviews and ratings for campgrounds, fostering a community-driven approach to campground discovery and selection.
Includes an image upload function that enables campground owners to post photos of their sites that are appropriate to draw guests.
The application is also integrated with Mapbox SDK to display campgrounds on an interactive map. Includes clustering of map markers to enhance the user experience, ensuring the map remains navigable and informative.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Passport.js
- Embedded JavaScript (EJS)
- Bootstrap
- Mapbox SDK
- Cloudinary

## How to run the application on your device?

### Prerequisites

- Node.js should be installed on your computer. Download it from [here](https://nodejs.org/en/download).
- MongoDB should be installed on your computer. Downlaod it from [here](https://www.mongodb.com/try/download/community) (select `Community Server` and download).
- Visual Studio Code is preferred for this guide. Download it from [here](https://code.visualstudio.com/download).
- An account on [Mapbox](https://www.mapbox.com/) and [Cloudinary](https://cloudinary.com/) will be needed in order to get the key/token.

### Getting started

Open terminal in your computer and run the following commands:

```
git clone https://github.com/inayankt/camp-guide/
cd camp-guide
npm install
code .
```

The project folder will open in VS code. Make a new `.env` file which will contain the environment variables in the same format as given in `.env.example` file.

### Starting the server

```
node app.js
```

The applicaton is now up and running on port `3000`. Open [http://localhost:3000/](http://localhost:3000/) to view the application.