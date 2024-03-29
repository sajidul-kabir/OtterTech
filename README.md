# OtterTech : A Full Stack Tech-Blogging system. Assignment Task-02 for Web Technologies.

## Technologies used
[<img width="36" alt="Vue.js" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" />][vue.js]
&nbsp; [<img width="36" alt="NodeJS" src="https://iconape.com/wp-content/png_logo_vector/node-js-2.png" />][nodejs]
&nbsp; [<img width="36" alt="ExpressJS" src="https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png" />][expressjs]
&nbsp; [<img width="36" alt="MySQL" src="https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1280,h_1280/https://keytotech.com/wp-content/uploads/2019/05/mysql_PNG23.png" />][mysql]
&nbsp; [<img width="50" alt="phpmyadmin" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/PhpMyAdmin_logo_2010_hidef.svg" />][phpmyadmin]
&nbsp; [<img width="75" alt="redis" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg" />][redis]
&nbsp; [<img width="110" alt="docker" src="https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png" />][docker]

<br/>

### [Visit the Webapp Here](https://ottertech-static.onrender.com/)


### The System has these following functionalities :

- Full Frontend System with Vue.js
- Users Authentication and Authorization with jwt
- CRUD functionalities for users and blogs models
- Upvote blogs 
- Data validation by Error Handling
- Server side caching with redis (Latest and most popular blogs are cached)
- Dockerize the system for development


### The complete API documentation can be found [here](https://documenter.getpostman.com/view/14324664/Uz5GowAx)
<br>

## How to run the project with Docker

- First Clone the project
- To build the containers run this command 
```
docker compose up -d
```
- Once all the containers are running visit `http://localhost:80` to phpmyadmin for local DB creation
- Create the Database like [this](https://gist.github.com/sajidul-kabir/7f8a07758779b248b72c9128f8df1fa1)
- Make a file named **config.env** inside the server folder and paste [this](https://gist.github.com/sajidul-kabir/bebb95cc508b68920073685e6e472230) code
- The node.js server will run on `http://localhost:5000`
- The client side application will run on `http://localhost:8080`. Access this port to enter the application.

[vue.js]: https://vuejs.org/
[nodejs]: https://nodejs.org/en/
[expressjs]: https://expressjs.com/
[mysql]: https://www.mysql.com/
[phpmyadmin]: https://www.phpmyadmin.net/
[redis]: https://redis.io/
[docker]: https://www.docker.com/
