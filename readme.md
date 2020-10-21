# [Prerequisites](#prerequisites)

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node JS LTS](http://nodejs.org) <small> Apenas versões LTS </small>

# [Getting Started](#gettinStarted)

- Clone the repository with your project name

```bash
    git clone https://github.com/dansantanna/boilerplate-nodejs.git newproject
```

- Go to directory created

```bash
    cd newproject
```

- Install NPM dependencies

```bash
    yarn

    # or

    npm install
```

- Set up your secrets in the "src/config.json" file. Example:

```json
{
  "port": 80,
  "jwt": { "secret": "daniel_boladão", "session": false },
  "bodyparser": { "limit": 1000 },
  "bcrypt": 10,
  "mongodb": {
    "driver": "mongodb+srv",
    "host": "cluster-teste.mongodb.net",
    "username": "boilerplate",
    "password": "boilerplate_password",
    "port": 27017,
    "database": "boilerplate"
  }
}
```

- Then simply start your app with nodemon

```bash
    yarn run dev

    # Or

    npm run dev
```
