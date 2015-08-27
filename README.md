# VolunteerCenterBackEnd

###getting started

```
$ git clone http://github.com/gillchristian/VolunteerCenterBackEnd.git
$ cd VolunteerCenterBackEnd
$ npm install
$ nodemon server.js
```

note that I'm using [nodemon](http://nodemon.io/), you need to have it installed globally first.


in order to run the server your `config.js` should look like this:

```
module.exports = {
   'port': process.env.PORT || 8080,
   'database': 'host://account:password.host.com:xxxx/database'
 };
 ```