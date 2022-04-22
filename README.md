# (temporary title) React pagination with paginated data from knex

When digging the internet on how to render paginated data from back end my team face a lack of information disregard the topic. So this was our team's solution to exhibit knex backend paginated data in a reasonable way.

## Prerequisites

1. paginated data served from backend
2. reactstrap v.8.10.0
3. styled components v.5.3.1
4. Reactjs v.17.0.2
5. yarn (because we prefer it, but you can use npm as well)
6. git
7. postgres

## Setup backend

Initiate the node project and create folders and files.

```cmd
yarn init -y

yarn add express dotenv knex pg knex-paginate

yarn add nodemon -D

touch knexfile.js

touch server.js

mkdir backend

cd backend

mkdir src

cd src

touch app.js

git clone https://github.com/ninjarobot/pokedata.git vendor

cd vendor

make

```
(make sure the logged system user exists in postgres)

knexfile.js

```js
import Knex from "knex";
import { config } from "dotenv";
import pg from "pg";
config();

pg.defaults.ssl = true;

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOSTNAME || "127.0.0.1",
      database: process.env.DB || "pokedata",
      user: process.env.DB_USER || "jimmyginga",
      password: process.env.DB_PASSWORD || "root",
      port: process.env.DB_PORT || "5432",
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
  },
  //uncomment for production
  /*production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOSTNAME,
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false }, // install ssl lib and delete line
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
  },*/
};

export default Knex(knexConfig.development);
```

server.js

```js
import { app } from "./src/app.js";
import { createServer } from "http";
const PORT = 8008;
const server = createServer(app);

server.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
```

## How to send paginated data with knex

See below an example of controller using node, express and knex

### Controller file

app.js

```js
// here the import considered knexfile.js to be in config folder
import express from "express";
import knex from "../knexfile.js";
import { attachPaginate } from 'knex-paginate'
const app = express();
attachPaginate()

app.get("/", async (req, res) => {
  try {
    const pokemon = await knex("pokemon").select().paginate({});
    res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).json({ message: `Can't list pokemons: ${error}` });
  }
});

export { app };
```

Then run <b>``` yarn run serve:dev```</b> in the terminal, the <b>Server is running on 8008 port </b> log will appear, it means that you can make requests in you <i>http://localhost:8008/</i>

### Endpoints
| path        | Method   |Result                   |
| ------------|----------|-------------------------|
| /           | get      |Array of pokemon objects |

## Setup frontend

```cmd
npx create-react-app frontend -y
```