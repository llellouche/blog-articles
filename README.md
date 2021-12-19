# Blog Articles

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

# Install

Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build with Docker
Build App `docker build -t articles/blog .`

Launch App `docker run -d -p 4200:80 articles/blog`

Open App on http://localhost:4200

# Features

Login with database Token authentication (http://localhost:4200/login)

Register (http://localhost:4200/register)

Main page (http://localhost:4200) :
* List all paginated articles
* Read one full article
* Comment one article
* React to one article
* Search Articles by title and Tags

Create article page (http://localhost:4200/article/create)

Update article page (http://localhost:4200/article/:id/update)

Not found (404) page (http://localhost:4200/toto)

*Only article owner and Admins accounts can update article* 

**App usage required to be logged**

Enjoy :thumbsup:

# Technical points
* Models are mapped from backends with mappings
* Components are reusable
* Guard implementation for redirect non logged users
* API Calls are in Api Services
* Api Interceptor to decorate requests with AuthToken
* Store as a service architecture, components communicates through GlobalStoreService
  * Data are stored in GlobalStoreService
  * Weak link between components
  * Code reusability
* URL Routing generator service (RouterService), with named routes
* Auth Service is used to store the user
