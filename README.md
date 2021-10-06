# BukitVistaTest
Private API to return image URL of movie poster, store user's favorite movies, and fetch user's favorite movies poster URL
## SetUp Project
start : node server.js
development purposes : nodemon server.js
Note : Plase check databse password on .env file
## API Documentation
### AUTH
* POST /register : register user data
  * Body 
    * name : username
    * password : user password
* POST /login : login to user account
  * Body
    * name : username
    * password : user password
* GET /logout : logout from certain user account

### ACCESS
* GET /movies : Forbidden
* GET /movies/{title}
  * return movie title and movie poster URL JSON format
* POST /movies/favorites : on loggin
  * Add user favorite movies and store it on database
  * Body 
    * title : movie title
* GET /movies/favorites  : on loggin
  * return all user's favorite movie title and poster URL JSON format 
